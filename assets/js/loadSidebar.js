// loadSidebar.js
document.addEventListener("DOMContentLoaded", function() {
  const sidebarContainer = document.getElementById("sidebar-container");
  if (sidebarContainer) { // Solo carga si existe el div
    fetch("./sidebar.html")
      .then(res => res.text())
      .then(data => {
        sidebarContainer.innerHTML = data;
      })
      .catch(err => console.error("Error cargando el sidebar:", err));
  }
});
