// ====================================================
// --- 1. CARRUSEL AUTOMÁTICO CON PAUSA AL PASAR EL MOUSE ---
// ====================================================

console.log("Tecnomanía: cargando sitio web...");

// Array de imágenes que rotarán en el carrusel
const imagenes = [
    "img/cargador.jpeg",
    "img/auricularesCarou.jpeg",
    "img/fundas.jpeg",
    "img/parlanteCarou.jpg"
];

let indice = 0; // Índice de la imagen actualmente visible
const img = document.getElementById("carousel-img"); // Elemento <img> del carrusel
const btnPrev = document.getElementById("prev");      // Botón Anterior
const btnNext = document.getElementById("next");      // Botón Siguiente

let intervalo; // Variable para almacenar el ID del intervalo (auto-cambio)

/**
 * Función que cambia la imagen en el carrusel con un efecto de transición (fade out/in).
 * Se remueve la clase 'visible', se cambia la fuente y se vuelve a agregar la clase.
 */
function mostrarImagen() {
    img.classList.remove("visible"); // Inicia el fade out
    setTimeout(() => {
        img.src = imagenes[indice]; // Cambia la imagen
        img.classList.add("visible"); // Inicia el fade in
    }, 300); // Tiempo de espera para el efecto
}

// Función para avanzar a la siguiente imagen.
function siguienteImagen() {
    // Calcula el nuevo índice (vuelve a 0 si llega al final)
    indice = (indice + 1) % imagenes.length; 
    mostrarImagen();
}

// Función para retroceder a la imagen anterior.
function anteriorImagen() {
    // Calcula el nuevo índice (vuelve al final si está en 0)
    indice = (indice - 1 + imagenes.length) % imagenes.length;
    mostrarImagen();
}

// Event Listeners para los botones de navegación manual
btnNext.addEventListener("click", siguienteImagen);
btnPrev.addEventListener("click", anteriorImagen);

// Función para iniciar el auto-cambio del carrusel cada 4 segundos
function iniciarCarrusel() {
    intervalo = setInterval(siguienteImagen, 4000); // 4000ms = 4 segundos
}

// Función para detener el carrusel (pausa)
function pausarCarrusel() {
    clearInterval(intervalo);
}

// Eventos de hover para pausar y reanudar el carrusel
img.addEventListener("mouseenter", pausarCarrusel); // Pausar al pasar el mouse
img.addEventListener("mouseleave", iniciarCarrusel); // Reanudar al quitar el mouse

// Iniciar al cargar la página
mostrarImagen();
iniciarCarrusel();


// ====================================================
// --- 2. MODAL HERO DESCRIPTIVO ---
// ====================================================

// Obtención de elementos del DOM para la funcionalidad del Modal
const heroButtons = document.querySelectorAll('.hero-content button'); // Todos los botones de los slides
const heroModal = document.getElementById('hero-modal');              // El contenedor del modal
const modalTitle = document.getElementById('hero-modal-title');      // Título dentro del modal
const modalText = document.getElementById('hero-modal-text');        // Párrafo dentro del modal
const heroClose = document.querySelector('.hero-close');             // Botón de cerrar (X)

// Array de objetos con la data a mostrar en el modal, mapeada por el orden de los botones
const heroData = [
    {
        title: "Cargadores Rápidos",
        text: "Deja de perder horas esperando. Con nuestros Cargadores de Carga Rápida, recarga tus dispositivos en una fracción del tiempo habitual y vuelve a tu día sin interrupciones."
    },
    {
        title: "Productos Importados",
        text: "Seleccionamos lo mejor del mercado internacional: accesorios, gadgets y componentes tecnológicos con calidad garantizada. Cada producto es verificado para ofrecerte lo mejor de cada marca."
    },
    {
        title: "Celulares de Última Generación",
        text: "Contamos con una amplia gama de smartphones importados con garantía, rendimiento excepcional y diseños modernos. Disfrutá lo último en tecnología móvil al alcance de tu mano."
    }
];

// Asigna un evento 'click' a cada botón para abrir el modal con su info correspondiente
heroButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Carga el contenido dinámicamente según el índice del botón
        modalTitle.textContent = heroData[index].title; 
        modalText.textContent = heroData[index].text;
        heroModal.style.display = 'flex'; // Muestra el modal (usa flex para centrar)
    });
});

// Evento para cerrar el modal al hacer clic en la 'X'
heroClose.addEventListener('click', () => heroModal.style.display = 'none');

// Evento para cerrar el modal al hacer clic fuera del contenido del mismo
window.addEventListener('click', (e) => {
    if (e.target === heroModal) heroModal.style.display = 'none';
});