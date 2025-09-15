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


// --- Modal Detalle Cliente ---
const modalDetalle = document.getElementById("modalDetalleCliente");
const closeDetalle = document.getElementById("closeDetalle");

// Botones Ver y Editar -> Abren el formulario detallado
document.querySelectorAll(".btn-view, .btn-edit").forEach(btn => {
  btn.addEventListener("click", () => {
    const clienteId = btn.getAttribute("data-id");
    console.log("Abrir detalle de:", clienteId);

    // 🚀 Aquí puedes precargar los datos del cliente con clienteId
    modalDetalle.style.display = "flex";
  });
});

// Cerrar modal detalle
closeDetalle.onclick = () => modalDetalle.style.display = "none";

window.addEventListener("click", (e) => {
  if (e.target === modalDetalle) {
    modalDetalle.style.display = "none";
  }
});
