// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. REFERENCIAS A ELEMENTOS DEL DOM ---
    const form = document.getElementById("contact-form");
    const inputNombre = document.getElementById("nombre");
    const inputTelefono = document.getElementById("telefono");
    const inputEmail = document.getElementById("email");
    const inputMensaje = document.getElementById("mensaje");
    const spinnerOverlay = document.getElementById("spinner");
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const closeModal = document.getElementById("closeModal");

    // --- 2. EXPRESIONES REGULARES PARA VALIDACIÓN ---
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Verifica formato email (ej: a@b.c)
    const regexTelefono = /^[0-9]{6,15}$/;           // Solo números, entre 6 y 15 dígitos

    // --- 3. FUNCIÓN DE VALIDACIÓN REUTILIZABLE ---

    /**
     * Valida un campo de entrada basado en una expresión regular o longitud mínima.
     * Añade o quita la clase 'input-error' y muestra/oculta el mensaje de error.
     * @param {HTMLElement} inputElement - El campo de entrada a validar.
     * @param {RegExp} regex - La expresión regular para la validación (puede ser null/false para longitud).
     * @param {string} errorElementId - ID del div donde se muestra el error.
     * @param {string} mensajeError - Mensaje a mostrar si la validación falla.
     * @returns {boolean} True si el campo es válido, False en caso contrario.
     */
    function validarCampo(inputElement, regex, errorElementId, mensajeError) {
        const valor = inputElement.value.trim();
        const errorElement = document.getElementById(errorElementId);

        // 1. Si el campo está vacío, quita el error y no lo marca como inválido (solo lo hace en el submit)
        if (valor.length === 0) {
            inputElement.classList.remove("input-error");
            errorElement.textContent = "";
            return false;
        }

        // 2. Realiza la prueba con la expresión regular proporcionada
        // Solo se usa regex para email y teléfono, los demás usan lógica de longitud.
        const esValido = regex ? regex.test(valor) : true;

        if (!esValido) {
            inputElement.classList.add("input-error");
            errorElement.textContent = mensajeError;
            return false;
        } else {
            inputElement.classList.remove("input-error");
            errorElement.textContent = "";
            return true;
        }
    }

    // --- 4. VALIDACIONES EN TIEMPO REAL (EVENTO 'input') ---

    // Email y Teléfono usan la función genérica con regex
    inputEmail.addEventListener("input", () =>
        validarCampo(inputEmail, regexEmail, "error-email", "Formato de email inválido.")
    );
    inputTelefono.addEventListener("input", () =>
        validarCampo(inputTelefono, regexTelefono, "error-telefono", "Formato de teléfono incorrecto (solo números, 6 a 15 dígitos).")
    );

    // Nombre y Mensaje usan lógica de longitud mínima
    inputNombre.addEventListener("input", () => {
        const valor = inputNombre.value.trim();
        const errorElement = document.getElementById("error-nombre");

        if (valor.length === 0) {
            inputNombre.classList.remove("input-error");
            errorElement.textContent = "";
        } else if (valor.length < 3) {
            inputNombre.classList.add("input-error");
            errorElement.textContent = "El nombre debe tener al menos 3 caracteres.";
        } else {
            inputNombre.classList.remove("input-error");
            errorElement.textContent = "";
        }
    });

    inputMensaje.addEventListener("input", () => {
        const valor = inputMensaje.value.trim();
        const errorElement = document.getElementById("error-mensaje");

        if (valor.length === 0) {
            inputMensaje.classList.remove("input-error");
            errorElement.textContent = "";
        } else if (valor.length < 10) {
            inputMensaje.classList.add("input-error");
            errorElement.textContent = "El mensaje debe tener al menos 10 caracteres.";
        } else {
            inputMensaje.classList.remove("input-error");
            errorElement.textContent = "";
        }
    });


    // --- 5. LÓGICA DE ENVÍO DEL FORMULARIO ---

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Detiene el envío predeterminado del formulario

        // Revalida todos los campos antes de enviar
        const nombreValido = inputNombre.value.trim().length >= 3;
        const telefonoValido = regexTelefono.test(inputTelefono.value.trim());
        const emailValido = regexEmail.test(inputEmail.value.trim());
        const mensajeValido = inputMensaje.value.trim().length >= 10;

        // Verifica si todos los campos son válidos
        if (nombreValido && telefonoValido && emailValido && mensajeValido) {

            spinnerOverlay.style.display = "flex"; // Mostrar spinner para simular carga

            // Simulación de envío de datos al servidor (retardo de 2 segundos)
            setTimeout(() => {
                spinnerOverlay.style.display = "none"; // Ocultar spinner

                // Muestra la ventana modal con la confirmación y los datos
                modal.style.display = "flex";
                // Limpia contenido previo del modal
                modalBody.innerHTML = "";

                // Crear elementos dinámicamente
                const pNombre = document.createElement("p");
                pNombre.innerHTML = `<strong>Nombre:</strong> ${inputNombre.value}`;

                const pTelefono = document.createElement("p");
                pTelefono.innerHTML = `<strong>Teléfono:</strong> ${inputTelefono.value}`;

                const pEmail = document.createElement("p");
                pEmail.innerHTML = `<strong>Email:</strong> ${inputEmail.value}`;

                const pMensaje = document.createElement("p");
                pMensaje.innerHTML = `<strong>Mensaje:</strong> ${inputMensaje.value}`;

                const hr = document.createElement("hr");
                hr.style.margin = "15px 0";
                hr.style.borderColor = "#62D0E1";

                const pFinal = document.createElement("p");
                pFinal.innerHTML = `🎉 ¡Gracias por contactarte con <strong>Tecnomanía</strong>!<br>Te responderemos a la brevedad 📩`;

                // Agregar al modal
                modalBody.appendChild(pNombre);
                modalBody.appendChild(pTelefono);
                modalBody.appendChild(pEmail);
                modalBody.appendChild(pMensaje);
                modalBody.appendChild(hr);
                modalBody.appendChild(pFinal);

                form.reset(); // Limpia todos los campos del formulario
            }, 2000); // 2 segundos de retardo
        } else {
            // Si hay errores, dispara manualmente los eventos 'input' para mostrar los mensajes de error
            // si el usuario dejó campos vacíos o mal formateados
            validarCampo(inputEmail, regexEmail, "error-email", "Formato de email inválido.");
            validarCampo(inputTelefono, regexTelefono, "error-telefono", "Formato de teléfono incorrecto.");
            inputNombre.dispatchEvent(new Event("input"));
            inputMensaje.dispatchEvent(new Event("input"));
        }
    });

    // --- 6. CIERRE DEL MODAL ---

    // Cerrar al hacer clic en la 'X'
    closeModal.addEventListener("click", () => (modal.style.display = "none"));

    // Cerrar al hacer clic fuera del contenido del modal
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});
