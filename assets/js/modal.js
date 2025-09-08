// ===== Modal abrir/cerrar =====
const modal = document.getElementById("modalCotizacion");
const btn = document.getElementById("btnNuevaCotizacion");
const closeBtn = modal.querySelector(".close");

btn.addEventListener("click", () => modal.style.display = "block");
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if(e.target === modal) modal.style.display = "none"; });

// ===== Variables =====
let itemCounter = 0;
let subitemCounters = {};

// ===== Funciones =====
function agregarItem() {
  itemCounter++;
  subitemCounters[itemCounter] = 0;

  const tbody = document.querySelector("#tablaItems tbody");
  const tr = document.createElement("tr");
  tr.classList.add("item-principal");
  tr.dataset.item = itemCounter;

  // Solo nombre y subtotal
  tr.innerHTML = `
    <td>${itemCounter}</td>
    <td><input type="text" placeholder="Nombre del capítulo"></td>
    <td colspan="5"></td>
    <td class="chapter-total">0</td>
  `;
  tbody.appendChild(tr);
}

function agregarSubitem() {
  if(itemCounter === 0) { alert("Primero agrega un Ítem principal"); return; }

  const lastItem = itemCounter;
  subitemCounters[lastItem]++;

  const tbody = document.querySelector("#tablaItems tbody");
  const tr = document.createElement("tr");
  tr.classList.add("subitem");
  tr.dataset.item = lastItem;

  tr.innerHTML = `
    <td>${lastItem}.${subitemCounters[lastItem]}</td>
    <td><input type="text" placeholder="Descripción"></td>
    <td><input type="text" placeholder="Unidad"></td>
    <td><input type="number" value="1" class="cantidad"></td>
    <td><input type="number" value="0" class="valor"></td>
    <td class="descuento">0</td>
    <td class="aiu">0</td>
    <td class="subtotal">0</td>
  `;

  tbody.appendChild(tr);
  tr.querySelectorAll(".cantidad, .valor").forEach(input => input.addEventListener("input", recalcularTotales));
  recalcularTotales();
}

// ===== Recalcular totales =====
function recalcularTotales() {
  let subtotalGeneral = 0;

  document.querySelectorAll(".item-principal").forEach(itemRow => itemRow.querySelector(".chapter-total").textContent = "0");

  document.querySelectorAll(".subitem").forEach(row => {
    const cantidad = parseFloat(row.querySelector(".cantidad").value) || 0;
    const valor = parseFloat(row.querySelector(".valor").value) || 0;
    const subtotal = cantidad * valor;
    row.querySelector(".subtotal").textContent = subtotal.toFixed(0);

    const item = row.dataset.item;
    const itemRow = document.querySelector(`.item-principal[data-item='${item}'] .chapter-total`);
    itemRow.textContent = (parseFloat(itemRow.textContent) + subtotal).toFixed(0);

    subtotalGeneral += subtotal;
  });

  document.getElementById("subtotalGeneral").value = subtotalGeneral.toFixed(0);
  const iva = subtotalGeneral * 0.19;
  document.getElementById("ivaGeneral").value = iva.toFixed(0);
  document.getElementById("totalGeneral").value = (subtotalGeneral + iva).toFixed(0);
}

// ===== Eventos botones =====
document.getElementById("addItemBtn").addEventListener("click", agregarItem);
document.getElementById("addSubitemBtn").addEventListener("click", agregarSubitem);

// ===== Menú contextual clic derecho =====
const contextMenu = document.getElementById("contextMenu");
let selectedRow = null;

document.querySelector("#tablaItems tbody").addEventListener("contextmenu", e => {
  e.preventDefault();
  const row = e.target.closest("tr");
  if(!row) return;
  selectedRow = row;
  contextMenu.style.top = `${e.pageY}px`;
  contextMenu.style.left = `${e.pageX}px`;
  contextMenu.style.display = "block";
});

window.addEventListener("click", () => contextMenu.style.display = "none");

// ===== Opciones menú =====
document.getElementById("ctxAddSubitem").addEventListener("click", () => {
  if(selectedRow && selectedRow.classList.contains("item-principal")) {
    const itemNum = parseInt(selectedRow.dataset.item);
    itemCounter = Math.max(itemCounter, itemNum);
    subitemCounters[itemNum] = subitemCounters[itemNum] || 0;
    subitemCounters[itemNum]++;

    const tbody = selectedRow.parentElement;
    const tr = document.createElement("tr");
    tr.classList.add("subitem");
    tr.dataset.item = itemNum;
    tr.innerHTML = `
      <td>${itemNum}.${subitemCounters[itemNum]}</td>
      <td><input type="text" placeholder="Descripción"></td>
      <td><input type="text" placeholder="Unidad"></td>
      <td><input type="number" value="1" class="cantidad"></td>
      <td><input type="number" value="0" class="valor"></td>
      <td class="descuento">0</td>
      <td class="aiu">0</td>
      <td class="subtotal">0</td>
    `;
    tbody.insertBefore(tr, selectedRow.nextSibling);
    tr.querySelectorAll(".cantidad, .valor").forEach(input => input.addEventListener("input", recalcularTotales));
    recalcularTotales();
  }
});

document.getElementById("ctxDelete").addEventListener("click", () => {
  if(!selectedRow) return;
  const tbody = selectedRow.parentElement;
  const itemNum = parseInt(selectedRow.dataset.item);

  if(selectedRow.classList.contains("item-principal")) {
    // eliminar ítem y subítems
    tbody.querySelectorAll(`tr[data-item='${itemNum}']`).forEach(r => r.remove());
    delete subitemCounters[itemNum];
  } else if(selectedRow.classList.contains("subitem")) {
    selectedRow.remove();
    // actualizar subitemCounters
    const siblings = tbody.querySelectorAll(`.subitem[data-item='${itemNum}']`);
    subitemCounters[itemNum] = siblings.length;
    siblings.forEach((r, i) => r.querySelector("td").textContent = `${itemNum}.${i+1}`);
  }

  // Reenumerar ítems principales
  const allItems = Array.from(tbody.querySelectorAll(".item-principal"));
  itemCounter = 0;
  allItems.forEach((row, idx) => {
    itemCounter = idx + 1;
    row.dataset.item = itemCounter;
    row.querySelector("td").innerHTML = `${itemCounter} - <input type="text" placeholder="Nombre del capítulo">`;

    // actualizar subítems de este ítem
    const subs = tbody.querySelectorAll(`.subitem[data-item='${idx+1}']`);
    subs.forEach((s, si) => {
      s.dataset.item = itemCounter;
      s.querySelector("td").textContent = `${itemCounter}.${si+1}`;
    });
    subitemCounters[itemCounter] = subs.length;
  });

  recalcularTotales();
});
