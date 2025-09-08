// ========================
// VARIABLES GLOBALES
// ========================
let itemCounter = 1;
let subitemCounters = {};
let total = 0;

// ========================
// FUNCIONES DEL MODAL
// ========================
function openModal() {
  document.getElementById("modalCotizacion").style.display = "block";
}

function closeModal() {
  document.getElementById("modalCotizacion").style.display = "none";
}

function cancelModal() {
  closeModal();
  resetForm();
}

function resetForm() {
  document.getElementById("itemsContainer").innerHTML = "";
  document.getElementById("totalCotizacion").innerText = "0.00";
  total = 0;
  itemCounter = 1;
  subitemCounters = {};
}

// ========================
// FUNCIONES DE ITEMS
// ========================
function addItem() {
  const itemsContainer = document.getElementById("itemsContainer");

  const row = document.createElement("tr");
  row.setAttribute("id", `item-${itemCounter}`);

  row.innerHTML = `
    <td>${itemCounter}</td>
    <td><input type="text" placeholder="Descripción"></td>
    <td><input type="number" value="1" min="1" onchange="updateSubtotal(${itemCounter})"></td>
    <td><input type="number" value="0" min="0" onchange="updateSubtotal(${itemCounter})"></td>
    <td id="subtotal-${itemCounter}">0.00</td>
    <td>
      <button onclick="addSubitem(${itemCounter})">+ Subítem</button>
      <button onclick="removeItem(${itemCounter})">❌</button>
    </td>
  `;

  itemsContainer.appendChild(row);
  subitemCounters[itemCounter] = 0;
  itemCounter++;
}

function removeItem(id) {
  const row = document.getElementById(`item-${id}`);
  if (row) {
    row.remove();
    updateTotal();
  }
}

// ========================
// FUNCIONES DE SUBITEMS
// ========================
function addSubitem(parentId) {
  subitemCounters[parentId]++;

  const itemsContainer = document.getElementById("itemsContainer");

  const row = document.createElement("tr");
  row.setAttribute("id", `subitem-${parentId}-${subitemCounters[parentId]}`);
  row.innerHTML = `
    <td>${parentId}.${subitemCounters[parentId]}</td>
    <td><input type="text" placeholder="Subitem descripción"></td>
    <td><input type="number" value="1" min="1" onchange="updateSubtotal(${parentId}, ${subitemCounters[parentId]})"></td>
    <td><input type="number" value="0" min="0" onchange="updateSubtotal(${parentId}, ${subitemCounters[parentId]})"></td>
    <td id="subtotal-${parentId}-${subitemCounters[parentId]}">0.00</td>
    <td>
      <button onclick="removeSubitem(${parentId}, ${subitemCounters[parentId]})">❌</button>
    </td>
  `;

  itemsContainer.appendChild(row);
}

function removeSubitem(parentId, subId) {
  const row = document.getElementById(`subitem-${parentId}-${subId}`);
  if (row) {
    row.remove();
    updateTotal();
  }
}

// ========================
// FUNCIONES DE CÁLCULOS
// ========================
function updateSubtotal(itemId, subId = null) {
  let qty, unit, subtotalElement;

  if (subId) {
    qty = document.querySelector(`#subitem-${itemId}-${subId} td:nth-child(3) input`).value;
    unit = document.querySelector(`#subitem-${itemId}-${subId} td:nth-child(4) input`).value;
    subtotalElement = document.getElementById(`subtotal-${itemId}-${subId}`);
  } else {
    qty = document.querySelector(`#item-${itemId} td:nth-child(3) input`).value;
    unit = document.querySelector(`#item-${itemId} td:nth-child(4) input`).value;
    subtotalElement = document.getElementById(`subtotal-${itemId}`);
  }

  const subtotal = qty * unit;
  subtotalElement.textContent = subtotal.toFixed(2);

  updateTotal();
}

function updateTotal() {
  total = 0;

  // Items principales
  document.querySelectorAll("[id^='subtotal-']").forEach(el => {
    total += parseFloat(el.textContent) || 0;
  });

  document.getElementById("totalCotizacion").textContent = total.toFixed(2);
}

// ========================
// GUARDAR
// ========================
function saveCotizacion() {
  alert(`Cotización guardada. Total: $${total.toFixed(2)}`);
  closeModal();
  resetForm();
}
