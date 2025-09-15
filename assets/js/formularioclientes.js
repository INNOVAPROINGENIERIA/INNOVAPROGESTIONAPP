// Tabs con animación suave
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // quitar active de todos
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => {
      c.classList.remove("active");
      c.style.display = "none";
    });

    // activar el actual
    btn.classList.add("active");
    const target = document.getElementById(btn.dataset.tab);
    target.style.display = "block";

    // animación (forzar reflow para que la transición ocurra)
    void target.offsetWidth;
    target.classList.add("active");
  });
});
