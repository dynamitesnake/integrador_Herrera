// Capturamos el formulario
const form = document.getElementById("contacto-form");
const mensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que se recargue la página

  // Capturamos los valores
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();

  // Limpiamos mensajes previos
  mensaje.innerHTML = "";
   resultado.innerHTML = "";

  // Validaciones
  if (nombre.length < 3) {
    mensaje.textContent = "❌ El nombre debe tener al menos 3 caracteres.";
    mensaje.style.color = "red";
    return;
  }

  // Validar teléfono: solo números
  if (!/^[0-9]+$/.test(telefono)) {
    mensaje.textContent = "❌ El teléfono debe contener solo números.";
    mensaje.style.color = "red";
    return;
  }

  // Validar email básico
  if (!email.includes("@") || email.length < 5) {
    mensaje.textContent = "❌ El email no es válido.";
    mensaje.style.color = "red";
    return;
  }

  // Si todo está correcto:
  mensaje.textContent = "✅ ¡Formulario enviado correctamente!";
  mensaje.style.color = "green";
  // Crear elementos dinámicos
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


  // Limpiar campos
  form.reset();
});