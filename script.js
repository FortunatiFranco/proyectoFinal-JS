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

//--------------------------------------------------------------------

const imagenDeCarrusel = document.getElementById("imagenCarrusel");
const botonAnterior = document.getElementById("btnanterior");
const botonSiguiente = document.getElementById("btnsiguiente")

const galeriaDeImagenes = [
    {
        src: "https://www.lolitamoda.com/uploads/post/image/207/portada.jpg",
        alt: "Publicidad Lacoste" 
    },
    {
        src: "https://d22fxaf9t8d39k.cloudfront.net/b01e57458380d132906692052f2eaa4e4873a011993aefe4a4d575c6c0a1c93d138046.jpg",
        alt: "Publicidad Supreme"
    },
    {
        src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEMSFYONp1jM-2Ey_B7mMe8nAoV-UbU8NtnieG8ymuCbXxjbrkzslnXVd_bwu7wA8NeS8xUPAovGc1BMPr5B-8Nf-ouHULpXiu2Och0T9jbgJDd2liR9_YTzDyUHh_OtDmClIsiNmjUgOS/s1600/Tommy+Hilfiger+UNI+01+FW14.jpg",
        alt: "Publicidad Tommy"
    },
    {
        src: "https://media.licdn.com/dms/image/v2/C5112AQF0ZMDG0J6peA/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1551265647160?e=1759968000&v=beta&t=Jyjbu19bFd6c3NUtDCidD8E8WJF0nuMiz8BwJnjngd8",
        alt: "publicidad Levis"
    },
    {
        src: "https://www.webretail.com.ar/wp-content/uploads/2023/10/Gnota_67863.jpg",
        alt: "Publicidad Adidas"
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

//---------------------------------------------------------------------------
const productList = document.getElementById('listaProd');
const verCarrito = document.getElementById('CarritoBtn');
const contadorCarrito = document.getElementById('Carrito-Contador');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount(){
    contadorCarrito.textContent = cart.reduce((acc, item)=> acc + item.quantity, 0)
}

function agregarAlCarrito(product){
    const existingProduct = cart.find((item)=> item.id === product.id)
    if(existingProduct){
        existingProduct.quantity += 1
    }else{
        cart.push({...product, quantity: 1})
    }
    localStorage.setItem('cart',JSON.stringify(cart));
    updateCartCount()
    Toastify({
        text: `${product.name} agregado al carrito`,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "linear-gradient(to right, #F527E0, #27F579)",
        stopOnFocus: true,
    }).showToast()
}

function imprimirProductos(productos){
    productList.innerHTML = ""
    productos.forEach((producto) => {
        const productosEnDiv = document.createElement ('div');
        productosEnDiv.className.add('products-card')
        productosEnDiv.innerHTML = `
    <image src="${producto.image}" alt="${producto.name}/>"
    <h3>${producto.name}</h3>
    <p>$ ${producto.price}</p>
    <button data-id="${producto.id}">Agregar al carrito</button>
    `;
    productList.appendChild(productosEnDiv);
})

document.querySelectorAll(".productosEnDiv button").forEach((button)=>{
    button.addEventListener("click",(evt)=>{
        const productsId = parseInt(evt.target.dataset.id)
        const productAdd = productos.find((item)=> item.id === productsId)
        if(productsId){
            agregarAlCarrito(productAdd)
        }
    })
})
}
    
async function fetchUrl(){
    try{
    const fetchProducts = await fetch('products.json');
    if(!fetchProducts.ok){
        throw new Error("Error de respuesta de API", error);
    }
    const productos = await fetchProducts.json();
    imprimirProductos(productos)
}catch (error){
    console.error('Error al encontrar API', error);
}
}

function animacionCarrito(){
    console.table(cart)
    if(cart.length === 0){
        Swal.fire({
            icon: 'info',
            title: "Carrito vacio",
            text: "Aun no hay productos agregados al carrito"
        })
        return;
    }
    let cartContent = '<ul style="list-style: none; padding: 0;">';
    let total = 0;
    cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    cartContent += `<li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px dotted #ccc; padding-bottom: 5px;">
    <span>${item.name} x ${item.quantity}</span>
    <span>$${itemTotal.toFixed(2)} 
    <button class="remove-from-cart-btn" data-id="${item.id}" style="background-color: #dc3545; color: white; border: none; border-radius: 3px; padding: 3px 8px; cursor: pointer; margin-left: 10px;">X</button>
    </span>
    </li>`;
    });
    cartContent += '</ul>'
    cartContent += `<p style="font-weight: bold; font-size: 1.2rem; text-align: right; margin-top: 20px;">Total: $${total.toFixed(2)}</p>`;

    Swal.fire({
        title: "Tu Carrito de Compras",
        html: cartContent,
        width: 600,
        showCancelButton: true,
        confirmButtonText: "Finalizar Compra",
        cancelButtonText: "Seguir Comprando",
        didOpen: () => {
            document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const productIdToRemove = parseInt(event.target.dataset.id);
                    removeFromCart(productIdToRemove);
            showCart();
        });
    });
},
}).then((result) => {
    if (result.isConfirmed) {
        Swal.fire({
            icon: "success",
            title: "Compra realizada",
            text: `Gracias por tu compra!`,
        });
        cart = [];
        localStorage.removeItem("cart");
        updateCartCount();
    }
});
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

verCarrito.addEventListener('click', animacionCarrito);
updateCartCount()
fetchUrl()

//--------------------------------------------------------------------------
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
