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
        src: "https://streetweardynamic.wordpress.com/wp-content/uploads/2020/04/person-holding-red-and-white-supreme-leather-duffel-bag-outdoor.jpg?w=910",
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
        src: "https://static.euronews.com/articles/stories/08/59/05/26/808x608_cmsv2_75aa317e-1504-50c0-8d93-325ce11ece0e-8590526.jpg",
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
const verCarrito = document.getElementById('ver-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
const productList = document.getElementById('product-list');

let carrito = JSON.parse(localStorage.getItem('carrito')) || []


function updateContador(){
    contadorCarrito.textContent = carrito.reduce((acc, item)=> acc + item.quantity, 0)
}

function agregarAlCarrito(productos){
    const productAdd = carrito.find((p)=> p.id ===productos.id)
    if(productAdd){
        productAdd.quantity += 1
    }else{
        carrito.push({...productos, quantity: 1})
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    updateContador()
    Toastify({
        text: `${productos.nombre} agregado al carrito`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #F227F5)",
        stopOnFocus: true,
    }).showToast() 
}

function imprimir(productos){
    productList.innerHTML = ""
    productos.forEach((producto) =>{
        const productDiv = document.createElement('div');
        productDiv.classList.add('products-card')
        productDiv.innerHTML = `
        <img src="${producto.image}" alt="${producto.nombre}"/>
        <h3>${producto.nombre}</h3>
        <p>$ ${producto.precio}</p>
        <button data-id="${producto.id}">Añadir al carrito</button>
        `;
        productList.appendChild(productDiv);
    })

    document.querySelectorAll('.products-card button').forEach((button)=>{
        button.addEventListener('click', (evt)=>{
            const productsId = parseInt(evt.target.dataset.id)
            const productsAdd = productos.find((p)=> p.id === productsId)
            if(productsId){
                agregarAlCarrito(productsAdd)
            }
        })
    })
}


async function urlProduct(){
    try{
        const resp = await fetch('products.json');
        if(!resp.ok){
            throw new Error("error en encontrar productos", Error);
        }
        const productos = await resp.json();
        imprimir(productos);
    }catch(error){
        console.error('no se encontro api', error)
    }
}

function animacionCarrito (){
    console.table(carrito)
    if(carrito.length === 0){
        swal.fire({
            icon: 'info',
            title: "Carrito vacio",
            text: "Aun no has agregado productos al carrito de compras"
        })
        return;
    }
    let carritoContent = '<ul style="list-style: none; padding: 0;">';
    let total = 0;
    carrito.forEach((item) =>{
        const itemTotal = item.precio * item.quantity;
        total += itemTotal;
        carritoContent += `<li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px dotted #ccc; padding-bottom: 5px;">
    <span>${item.nombre} x ${item.quantity}</span>
    <span>$${itemTotal.toFixed(2)} 
    <button class="remove-from-cart-btn" data-id="${item.id}"style="background-color: #dc3545; color: white; border: none; border-radius: 3px; padding: 3px 8px; cursor: pointer; margin-left:10px;">❌</button>
    </span>
    </li>
    `;
    });
    carritoContent += '</ul>'
    carritoContent += `<p style="font-weight: bold; font-size: 1.2rem; text-align: right; margin-top: 20px;">Total: $${total.toFixed(2)}</p>`;

    Swal.fire({
        title: "Tu Carrito de Compras",
        html: carritoContent,
        width: 600,
        showCancelButton: true,
        confirmButtonText: "Finalizar Compra",
        cancelButtonText: "Seguir Comprando",
        didOpen: () => {
            document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const productIdToRemove = parseInt(event.target.dataset.id);
                    removeFromCart(productIdToRemove);
            animacionCarrito();
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
        carrito = [];
        localStorage.removeItem("carrito");
        updateContador();
    }
});
}

function removeFromCart(productId) {
    carrito = carrito.filter((item) => item.id !== productId);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    updateContador();
}

verCarrito.addEventListener('click', animacionCarrito);
updateContador()
urlProduct()
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
    <p>Con tu sueldo bruto, financiamos la compra en cuotas hasta el monto total de $ ${sueldoConAumento}</p>`
    formularioJs.reset()
});
