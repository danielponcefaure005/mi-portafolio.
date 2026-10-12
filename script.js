const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

// Abrir y cerrar el menú en pantallas pequeñas
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
    );
});

// Cerrar el menú cuando se selecciona una sección
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
    });
});

// Filtrar proyectos por categoría
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach((card) => {
            const matchesFilter =
                selectedFilter === "todos" ||
                card.dataset.category === selectedFilter;

            card.hidden = !matchesFilter;
        });
    });
});

// Mostrar el año actual automáticamente
document.querySelector("#year").textContent = new Date().getFullYear();

// El formulario prepara un correo usando la aplicación de correo del visitante
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    const destination = "TU-CORREO@EJEMPLO.COM";
    const subject = encodeURIComponent(`Mensaje de ${name}`);
    const body = encodeURIComponent(
        `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`
    );

    formMessage.textContent =
        "Se abrirá tu aplicación de correo para enviar el mensaje.";

    window.location.href =
        `mailto:${destination}?subject=${subject}&body=${body}`;
});
