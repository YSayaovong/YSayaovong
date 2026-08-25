const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
}
