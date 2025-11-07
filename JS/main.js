// Js de index.html
console.log("Tecnomanía: cargando sitio web...");

// Array de imágenes del carrusel
const imagenes = [
  "img/cargador.jpeg",
  "img/auriculares.jpeg",
  "img/fundas.jpeg"
];

// Índice actual
let indice = 0;

// Elementos del DOM
const img = document.getElementById("carousel-img");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

// Mostrar imagen según índice
function mostrarImagen() {
  img.classList.remove("visible");
  setTimeout(() => {
    img.src = imagenes[indice];
    img.classList.add("visible");
  }, 500); // pequeño retardo para suavizar
}

// Botón "Siguiente"
btnNext.addEventListener("click", () => {
  indice++;
  if (indice >= imagenes.length) indice = 0;
  mostrarImagen();
});

// Botón "Anterior"
btnPrev.addEventListener("click", () => {
  indice--;
  if (indice < 0) indice = imagenes.length - 1;
  mostrarImagen();
});

// Cambio automático cada 4 segundos
setInterval(() => {
  indice++;
  if (indice >= imagenes.length) indice = 0;
  mostrarImagen();
}, 4000);


// Mostrar la primera imagen al cargar
mostrarImagen();