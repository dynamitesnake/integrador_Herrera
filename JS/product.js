// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const botonesDetalles = document.querySelectorAll('.ver-detalles'); // NodeList de todos los botones "Ver Detalles"
    const modalContainer = document.getElementById('modal-container'); // Contenedor del modal (fondo oscuro)
    const closeModalBtn = document.getElementById('close-modal');      // Botón de cerrar (la 'X')

    // Elementos donde se inyectará el contenido dentro del modal
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');

    // --- 2. FUNCIONES PRINCIPALES ---

    /**
     * Abre el modal y carga los datos del producto seleccionado.
     * @param {Event} e - El evento de clic del botón.
     */
    function abrirModal(e) {
        // Encuentra la tarjeta de producto más cercana al botón que se hizo clic
        const productoDiv = e.target.closest('.producto'); 
        
        // Extrae la información necesaria de los elementos hijos de la tarjeta
        const imgSrc = productoDiv.querySelector('img').src;
        const title = productoDiv.querySelector('h3').textContent;
        const price = productoDiv.querySelector('.precio').textContent;
        // Extrae el detalle extendido del atributo personalizado 'data-detalle' del botón
        const detalleExtra = e.target.getAttribute('data-detalle'); 

        // Inyecta los datos extraídos en los elementos del modal
        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDescription.textContent = detalleExtra;
        modalPrice.textContent = price;

        // Muestra el modal agregando la clase 'show' (controlada por CSS)
        modalContainer.classList.add('show');
    }

    /**
     * Cierra el modal removiendo la clase 'show'.
     */
    function cerrarModal() {
        modalContainer.classList.remove('show');
    }

    // --- 3. ASIGNACIÓN DE EVENTOS ---

    // 3.1. Asigna el evento 'abrirModal' a cada botón "Ver Detalles"
    botonesDetalles.forEach(button => button.addEventListener('click', abrirModal));
    
    // 3.2. Asigna el evento 'cerrarModal' al botón de cerrar ('X')
    closeModalBtn.addEventListener('click', cerrarModal);

    // 3.3. Cierra el modal cuando se hace clic en el fondo oscuro (fuera del modal-content)
    window.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            cerrarModal();
        }
    });

    console.log("Products JS: Modal con cierre funcional cargado correctamente.");
});