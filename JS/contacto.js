document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const inputNombre = document.getElementById("nombre");
  const inputTelefono = document.getElementById("telefono");
  const inputEmail = document.getElementById("email");
  const inputMensaje = document.getElementById("mensaje");
  const spinnerOverlay = document.getElementById("spinner");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeModal = document.getElementById("closeModal");

  // Expresiones regulares para validación
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexTelefono = /^[0-9]{6,15}$/;

  /**
   * Valida un campo de entrada en tiempo real
   */
  function validarCampo(inputElement, regex, errorElementId, mensajeError) {
    const valor = inputElement.value.trim();
    const errorElement = document.getElementById(errorElementId);

    if (valor.length === 0) {
      inputElement.classList.remove("input-error");
      errorElement.textContent = "";
      return false;
    }

    if (!regex.test(valor)) {
      inputElement.classList.add("input-error");
      errorElement.textContent = mensajeError;
      return false;
    } else {
      inputElement.classList.remove("input-error");
      errorElement.textContent = "";
      return true;
    }
  }

  // Validaciones en tiempo real
  inputEmail.addEventListener("input", () =>
    validarCampo(inputEmail, regexEmail, "error-email", "Formato de email inválido.")
  );
  inputTelefono.addEventListener("input", () =>
    validarCampo(inputTelefono, regexTelefono, "error-telefono", "Formato de teléfono incorrecto.")
  );
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

  /**
   * Envío del formulario con simulación de carga y modal de confirmación
   */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreValido = inputNombre.value.trim().length >= 3;
    const telefonoValido = regexTelefono.test(inputTelefono.value.trim());
    const emailValido = regexEmail.test(inputEmail.value.trim());
    const mensajeValido = inputMensaje.value.trim().length >= 10;

    if (nombreValido && telefonoValido && emailValido && mensajeValido) {
      spinnerOverlay.style.display = "flex"; // Mostrar spinner centrado

      setTimeout(() => {
        spinnerOverlay.style.display = "none"; // Ocultar spinner

        // Mostrar ventana modal con los datos ingresados
        modal.style.display = "flex";
        modalBody.innerHTML = `
          <p><strong>Nombre:</strong> ${inputNombre.value}</p>
          <p><strong>Teléfono:</strong> ${inputTelefono.value}</p>
          <p><strong>Email:</strong> ${inputEmail.value}</p>
          <p><strong>Mensaje:</strong> ${inputMensaje.value}</p>
        `;

        form.reset();
      }, 2000);
    } else {
      // Mostrar errores en los campos no válidos
      validarCampo(inputEmail, regexEmail, "error-email", "Formato de email inválido.");
      validarCampo(inputTelefono, regexTelefono, "error-telefono", "Formato de teléfono incorrecto.");
      inputNombre.dispatchEvent(new Event("input"));
      inputMensaje.dispatchEvent(new Event("input"));
    }
  });

  // Cerrar el modal
  closeModal.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

