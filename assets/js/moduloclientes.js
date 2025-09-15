// --- Modal Nuevo Cliente ---
const modalNuevo = document.getElementById("modalNuevoCliente");
const btnNuevo = document.getElementById("btnNuevoCliente");
const closeNuevo = modalNuevo.querySelector(".close");

btnNuevo.onclick = () => modalNuevo.style.display = "flex";
closeNuevo.onclick = () => modalNuevo.style.display = "none";

window.onclick = (event) => {
  if (event.target === modalNuevo) modalNuevo.style.display = "none";
};

// --- Formulario Nuevo Cliente ---
document.getElementById("formNuevoCliente").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Cliente guardado correctamente ✅");
  modalNuevo.style.display = "none";
  this.reset();
});

// --- Ver y Editar Cliente -> Redirigen a formulario detallado ---
document.querySelectorAll(".btn-view, .btn-edit").forEach(btn => {
  btn.addEventListener("click", () => {
    const clienteId = btn.getAttribute("data-id");

    // 🚀 Redirigir al formulario detallado
    window.location.href = `formularioclientes.html?id=${clienteId}`;
  });
});
