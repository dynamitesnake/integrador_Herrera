console.log("Tecnomanía: cargando sitio web...");
alert("👋 ¡Bienvenido a Tecnomanía! Tu tienda virtual de confianza.");
// Array de imágenes del carrusel
const imagenes = [
    "img/cargador.jpeg",
    "img/auriculares.jpeg",
    "img/fundas.jpeg"   
];

// Índice de la imagen actual
let indice = 0;

// Seleccionamos elementos del DOM
const img = document.getElementById("carousel-img");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

// Función para actualizar la imagen mostrada
function mostrarImagen() {
  img.src = imagenes[indice];
}

// Botón "Siguiente"
btnNext.addEventListener("click", () => {
  indice++;
  if (indice >= imagenes.length) indice = 0; // vuelve al inicio
  mostrarImagen();
});

// Botón "Anterior"
btnPrev.addEventListener("click", () => {
  indice--;
  if (indice < 0) indice = imagenes.length - 1; // va al final
  mostrarImagen();
});
document.write("<h3 style='text-align:center; color:#007bff;'>Gracias por visitar Tecnomanía 🖥️</h3>");