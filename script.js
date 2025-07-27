
document.addEventListener('DOMContentLoaded', function() {
    // Toggle del Menú Móvil
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active'); // También toggle la clase 'active' para animar el icono
        });
    }

    // Cierra el menú móvil cuando se hace clic en un enlace de navegación
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Desplazamiento Suave para Enlaces Internos
    // Esto anula el comportamiento predeterminado del navegador y usa scrollIntoView
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el salto instantáneo

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botón "Volver Arriba"
    const scrollTopButton = document.createElement('button');
    scrollTopButton.id = 'scrollTopBtn';
    scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>'; // Icono de Font Awesome
    document.body.appendChild(scrollTopButton);

    // Muestra/oculta el botón al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Aparece después de 300px de scroll
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });

    // Hace scroll hacia arriba al hacer clic
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animación de Secciones al Hacer Scroll (Intersection Observer)
    // Selecciona todas las secciones que quieres animar
    const sectionsToAnimate = document.querySelectorAll('.features-advanced, .benefits-advanced, .gallery, .cta-advanced');

    const observerOptions = {
        root: null, // El viewport es el elemento raíz
        rootMargin: '0px',
        threshold: 0.1 // El callback se ejecutará cuando el 10% de la sección sea visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Añade la clase 'visible' para activar la animación
                observer.unobserve(entry.target); // Deja de observar una vez que la animación se ha activado
            }
        });
    }, observerOptions);

    // Observa cada sección
    sectionsToAnimate.forEach(section => {
        sectionObserver.observe(section);
        // Opcional: añade una clase inicial para que no sean visibles antes de la animación
        section.classList.add('fade-in-section');
    });
});