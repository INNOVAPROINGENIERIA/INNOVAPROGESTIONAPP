document.addEventListener("DOMContentLoaded", function() {
  const sidebarContainer = document.getElementById("sidebar-container");
  if (!sidebarContainer) return;

  // sidebar.html está en la misma carpeta que cotizaciones.html
  fetch("sidebar.html")
    .then(res => res.text())
    .then(data => {
      sidebarContainer.innerHTML = data;
    })
    .catch(err => console.error("Error cargando el sidebar:", err));
});
