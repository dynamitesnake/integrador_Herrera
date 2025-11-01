//Js de index.html
console.log("Tecnomanía: cargando sitio web...");
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
// Función para pasar automáticamente a la siguiente imagen
function siguienteImagen() {
  indice++;
  if (indice >= imagenes.length) indice = 0;
  mostrarImagen();
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

// Cambio automático cada 3 segundos
let intervalo = setInterval(siguienteImagen, 3000);

// Pausa el carrusel cuando el mouse está sobre la imagen
img.addEventListener("mouseover", () => clearInterval(intervalo));

// Reanuda el carrusel cuando se quita el mouse
img.addEventListener("mouseout", () => {
  intervalo = setInterval(siguienteImagen, 3000);
});