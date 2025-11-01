document.addEventListener('DOMContentLoaded', () => {
    // Captura de elementos DOM necesarios
    const form = document.getElementById("contacto-form");
    const mensajeError = document.getElementById("mensaje");
    const resultado = document.getElementById("resultado");
    
    // Captura de elementos del botón/spinner
    const submitBtn = document.getElementById("submit-btn");
    const spinner = document.getElementById("spinner");

    // Definiciones de Expresiones Regulares
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const regexTelefono = /^[0-9\s-]{8,15}$/; 

    // Funcion validacion en tiempo real
    function validarCampo(inputElement, regex) {
        const valor = inputElement.value.trim();
        const esValido = regex.test(valor);
        
        if (valor.length === 0) {
            inputElement.classList.remove('input-error');
            return true;
        }

        if (!esValido) {
            inputElement.classList.add('input-error');
            return false;
        } else {
            inputElement.classList.remove('input-error');
            return true;
        }
    }

    //Listeners para validación en tiempo real
    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputTelefono = document.getElementById("telefono");
    
    inputEmail.addEventListener('input', () => validarCampo(inputEmail, regexEmail));
    inputTelefono.addEventListener('input', () => validarCampo(inputTelefono, regexTelefono));
    
    inputNombre.addEventListener('input', () => {
        if (inputNombre.value.trim().length >= 3 || inputNombre.value.trim().length === 0) {
            inputNombre.classList.remove('input-error');
        } else {
            inputNombre.classList.add('input-error');
        }
    });

    //Logica de envío del formulario
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Reiniciar mensajes y resultados
        mensajeError.innerHTML = "";
        resultado.innerHTML = "";
        let errores = []; 

        const nombre = inputNombre.value.trim();
        const telefono = inputTelefono.value.trim();
        const email = inputEmail.value.trim();

        // --- VALIDACIONES ---
        
        // a) Nombre
        if (nombre.length === 0) {
            errores.push("El campo Nombre es obligatorio.");
        } else if (nombre.length < 3) {
            errores.push("El Nombre debe tener al menos 3 caracteres.");
        } else if (nombre.length > 50) {
            errores.push("El Nombre no puede exceder los 50 caracteres.");
        }

        // b) Teléfono
        if (telefono.length === 0) {
            errores.push("El campo Teléfono es obligatorio.");
        } else if (!regexTelefono.test(telefono)) {
            errores.push("El Teléfono no tiene un formato válido (solo números, guiones o espacios).");
        } else if (telefono.length > 15) {
             errores.push("El Teléfono no puede exceder los 15 caracteres.");
        }

        // c) Email
        if (email.length === 0) {
            errores.push("El campo Email es obligatorio.");
        } else if (!regexEmail.test(email)) {
            errores.push("El Email no tiene un formato válido (ej: usuario@dominio.com).");
        } else if (email.length > 50) {
             errores.push("El Email no puede exceder los 50 caracteres.");
        }
        
        // --- MANEJO DE ERRORES O ÉXITO ---

        if (errores.length > 0) {
            //  ¡HAY ERRORES! Mostrar mensajes de error
            
            mensajeError.classList.remove('mensaje-exito');
            mensajeError.classList.add('mensaje-error');

            const listaErrores = document.createElement("ul");
            errores.forEach(error => {
                const itemError = document.createElement("li");
                itemError.innerHTML = "❌ " + error;
                listaErrores.appendChild(itemError);
            });
            
            mensajeError.appendChild(listaErrores);
            
        } else {
            // ¡NO HAY ERRORES! Simular envío exitoso
            
            // Mostrar Spinner y deshabilitar botón
            submitBtn.disabled = true;
            spinner.style.display = 'inline-block';

            // Simular el envío de datos con un retraso (2 segundos)
            setTimeout(() => {
                
                // 2. Ocultar Spinner y habilitar botón
                spinner.style.display = 'none'; 
                submitBtn.disabled = false;

                // ===================================================
                // CÓDIGO DE ÉXITO (SE EJECUTA SÓLO DESPUÉS DEL RETRASO)
                // ===================================================

                // 1. Mensaje de éxito
                mensajeError.classList.remove('mensaje-error');
                mensajeError.classList.add('mensaje-exito');
                mensajeError.textContent = "✅ ¡Formulario enviado correctamente!";

                // 2. Crear elementos dinámicos
                const titulo = document.createElement("h3");
                titulo.textContent = "📩 Datos ingresados:";

                const lista = document.createElement("ul");
                
                const item1 = document.createElement("li");
                item1.textContent = "Nombre: " + nombre;

                const item2 = document.createElement("li");
                item2.textContent = "Teléfono: " + telefono;

                const item3 = document.createElement("li");
                item3.textContent = "Email: " + email;

                // Insertar los elementos en la página
                lista.appendChild(item1);
                lista.appendChild(item2);
                lista.appendChild(item3);
                resultado.appendChild(titulo);
                resultado.appendChild(lista);
                
                // 3. Limpiar campos
                form.reset(); 

            }, 2000); // 2000 milisegundos = 2 segundos de espera simulada
        }
    });
});