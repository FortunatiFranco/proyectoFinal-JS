const botonOscuro = document.getElementById("modoOscuro");
const body = document.body;

botonOscuro.addEventListener("click",()=>{
    body.classList.toggle("modo-noche");
    if(body.classList.contains("modo-noche")){
        localStorage.setItem("tema", "noche");
        botonOscuro.textContent = "Modo Dia";
    }else{
        localStorage.setItem("tema", "dia");
        botonOscuro.textContent = "Modo Noche"
    }
});

const temaGuardado = localStorage.getItem("tema");
if(temaGuardado === "noche"){
    body.classList.add("modo-noche");
}else{
    body.classList.remove("modo-noche")
};

const imagenDeCarrusel = document.getElementById("imagenCarrusel");
const botonAnterior = document.getElementById("btnanterior");
const botonSiguiente = document.getElementById("btnsiguiente")

const galeriaDeImagenes = [
    {
        src: "https://media.tycsports.com/files/2024/06/05/726440/real-madrid-nueva-camiseta_862x485.webp?v=1",
        alt: "publicidad Real Madrid" 
    },
    {
        src: "https://img.planetafobal.com/2025/05/chelsea-fc-nike-home-kit-2025-2026-trq.webp",
        alt: "publicidad Chelsea"
    },
    {
        src: "https://www.infobae.com/resizer/v2/2JJ5MTLEW5EIHPDWUNEO23OVEQ.jpg?auth=0b21c32f1e6b202ed1c3b48a75f8fb1f2ed13226508e7afda01d367e0909bb29&smart=true&width=350&height=197&quality=85",
        alt: "publicidad River"
    },
    {
        src: "https://pbs.twimg.com/media/FkQm_SuXwAIQIDi.jpg",
        alt: "La Cabra con adidas"
    }
];

let indiceImage = 0;

function actualizarImagen (){
    imagenDeCarrusel.src = galeriaDeImagenes[indiceImage].src;
    imagenDeCarrusel.alt = galeriaDeImagenes[indiceImage].alt;
}

botonAnterior.addEventListener("click",()=>{
    indiceImage --;
    if(indiceImage < 0){
        indiceImage = galeriaDeImagenes.length -1;
    }
    actualizarImagen();
});

botonSiguiente.addEventListener("click",()=>{
    indiceImage ++;
    if(indiceImage >= galeriaDeImagenes.length){
        indiceImage = 0;
    }
    actualizarImagen();
});

actualizarImagen();

const productos = [
    {
        imagen: "https://www.backseries.com/wp-content/uploads/nike-branded-apparel-coleccion-de-ropa-hoodie-portada.jpg",
        nombre: "Campera Nike",
        precio: 135000
    },
    {
        imagen: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f0fef5f7-8c96-459b-af86-d6302513f3e0/B+NSW+TCH+FLC+SSNL+TF%2B+WR+FZ.png",
        nombre: "Campera Niños",
        precio: 95000
    },
    {
        imagen: "https://d22fxaf9t8d39k.cloudfront.net/09b2676fc9033ee0994e3c0ed0634a67d19de39b60ff6e4f5ff572c74051610552085.jpg",
        nombre: "Camiseta Aleti",
        precio: 120000
    },
];

const contenedor = document.getElementById ("listaProductos");

productos.forEach(producto =>{
    const div = document.createElement("div");
    div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <button class="comprar">Comprar</button>`;
    contenedor.appendChild(div)
});


const formularioJs = document.getElementById("miFormulario");
formularioJs.addEventListener("submit",(event)=>{
    event.preventDefault();

const nombreForm = document.getElementById("nombre").value;
const emailForm = document.getElementById("email").value;
const sueldoForm = Number(document.getElementById("sueldo").value);
const resultadoForm = document.getElementById("resultadoSueldo");

const datosForm = {
    nombre: nombreForm,
    email: emailForm,
    sueldo: sueldoForm
};

localStorage.setItem("datosDeFormulario", JSON.stringify(datosForm));

const datosGuardados = JSON.parse(localStorage.getItem("datosDeFormulario"));

    const sueldoOriginal = datosGuardados.sueldo;
    const sueldoConAumento = Math.round(sueldoOriginal * 1.15);

    resultadoForm.innerHTML = `
    <hr>
    <h3>Simulación de tu compra financiada</h3>
    <hr>
    <p>Con tu sueldo bruto, financiamos la compra en cuotas hasta el monto total de ${sueldoConAumento}</p>`
    formularioJs.reset()
});
