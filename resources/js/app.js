const app = {
    // Inicializa el navbar y añade la clase 'active' al elemento seleccionado
    activeSection: function() {
        const navBar = document.getElementById("nav-bar");
        const navLinks = navBar.getElementsByClassName("nav-link");

        // Agrega un evento de clic a cada enlace del navbar
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener("click", function() {
                // Remueve la clase 'active' de cualquier enlace que ya la tenga
                const currentActive = navBar.querySelector(".active");
                if (currentActive) {
                    currentActive.classList.remove("active");
                }

                // Agrega la clase 'active' al enlace seleccionado
                this.classList.add("active");

                // Llama a la función para mostrar la sección correspondiente
                const sectionId = this.getAttribute("data-section");
                app.showSection(sectionId);
            });
        }
    },

    // Función para mostrar solo la sección seleccionada
    showSection: function(sectionId) {
        const sections = ['inicio', 'pts', 'usrs', 'tiempo-real', 'historico'];
        sections.forEach((id) => {
            document.getElementById(id).style.display = id === sectionId ? 'block' : 'none';
        });
    }
};

// Ejecuta app.activeSection al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    app.activeSection();
    app.showSection('inicio'); // Muestra la sección "Inicio" al cargar
});
