document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar todos los elementos necesarios
    const botonesDetalles = document.querySelectorAll('.ver-detalles');
    const modalContainer = document.getElementById('modal-container');
    const closeModalBtn = document.getElementById('close-modal');
    
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');

    // 2. Función para abrir el modal
    function abrirModal(e) {
        // e.target es el botón en el que se hizo clic
        const productoDiv = e.target.closest('.producto');

        // Extraer la información del producto
        const imgSrc = productoDiv.querySelector('img').src;
        const title = productoDiv.querySelector('h3').textContent;
        const description = productoDiv.querySelector('p').textContent;
        const price = productoDiv.querySelector('.precio').textContent;

        // Rellenar el modal con la información
        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalPrice.textContent = price;

        // Mostrar el modal
        modalContainer.style.display = 'block';
    }

    // 3. Función para cerrar el modal
    function cerrarModal() {
        modalContainer.style.display = 'none';
    }

    // 4. Asignar Event Listeners
    
    // A cada botón de "Ver Detalles"
    botonesDetalles.forEach(button => {
        button.addEventListener('click', abrirModal);
    });

    // Al botón de cerrar 'X'
    closeModalBtn.addEventListener('click', cerrarModal);

    // Si el usuario hace clic fuera del modal, también se cierra
    window.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            cerrarModal();
        }
    });

    console.log("Products JS: Modal funcional cargado.");
});