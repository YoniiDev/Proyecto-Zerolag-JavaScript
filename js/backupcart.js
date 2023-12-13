//ESTA INFORMACION SE COLOCO SOLA Y NO LA QUISE ELIMINAR ASI QUE LA COMENTE, POR LO QUE AVERIGUE ESTA RELACIONADO CON SASS.
/* const { info } = require("node-sass"); */

//OBTENER ELEMENTOS DEL DOOM
const contenedorDeProductos = document.querySelector('.contenedor_de_productos');
const contenedorCarritoDeCompra = document.querySelector('.card_items');
const precioTotal = document.querySelector('.precio_total');
const cantidadDeProducto = document.querySelector('.contador_de_productos');
const iconoCarrito = document.querySelector('.carrito');
const btnCerrarCarrito = document.querySelector('.btn-cerrar');

//MOSTRAR EL CARRITO DE COMPRA AL HACER CLIC EN EL ICONO DEL CARRITO
iconoCarrito.addEventListener('click', mostrarCarrito);

function mostrarCarrito() {
    const elementoCarrito = document.getElementById("carritoDeProductosId"); 
    elementoCarrito.style.display = "block";
}

//OCULTAR EL CARRITO DE COMPRA AL HACER CLIC EN EL BOTON CERRAR
btnCerrarCarrito.addEventListener('click', cerrarCarrito);

function cerrarCarrito() {
    elementoCarrito = document.getElementById("carritoDeProductosId");
    elementoCarrito.style.display = "none";
}

//ARRAY CARRITO DE COMPRA
let carritoDeCompra = [];

//VARIABLES
let totalCarrito = 0;
let contadorDeProducto = 0;

//ESCUCHAR EVENTOS
loadEventListener();
function loadEventListener() {
    contenedorDeProductos.addEventListener('click', añadirProducto);
}

//FUNCION PARA AÑADIR PRODUCTO AL CARRITO
function añadirProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn_añadir_al_carrito')) {
        const selecionProducto = e.target.parentElement;
        obtenerInformacionDelProducto(selecionProducto);
    }
}

//FUNCION PARA ELIMINAR PRODUCTOS
function eliminarProducto(eliminarId) {

    carritoDeCompra.forEach((producto) => {
        if (producto.id == eliminarId) {
            let reducirPrecio = parseInt(producto.precioNormal) * parseInt(producto.cantidad);
            totalCarrito = totalCarrito - reducirPrecio;
        }
    });

    carritoDeCompra = carritoDeCompra.filter((producto) => producto.id !== eliminarId);

    contadorDeProducto--;

    if (carritoDeCompra.length === 0) {
        precioTotal.innerHTML = 0;
        cantidadDeProducto.innerHTML = 0;

    }

    cargarHtml();

    //ALMACENAR EN EL LOCALSTORAGE
    guardarCarritoEnLocalStorage();
}

//OBTENER INFORMACION DEL PRODUCTO
function obtenerInformacionDelProducto(producto) {
    const informacionProducto = {
        imagen: producto.querySelector(".imagen_de_producto").src,
        descripcion: producto.querySelector(".descripcion_producto").textContent,
        precioNormal: producto.querySelector('.precio_normal').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    totalCarrito = parseInt(totalCarrito) + parseInt(informacionProducto.precioNormal);

    const existe = carritoDeCompra.some((producto) => producto.id === informacionProducto.id);

    if (existe) {
        const product = carritoDeCompra.map((producto) => {
            if (producto.id === informacionProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        carritoDeCompra = [...product]
    } else {
        carritoDeCompra = [...carritoDeCompra, informacionProducto]
        contadorDeProducto++;
    }
    cargarHtml();

    //ALMACENAR CARRITO EN EL LOCALSTORAGE
    guardarCarritoEnLocalStorage();
}

// //CARGAR EL CONTENIDO EN EL HTML
function cargarHtml() {
    limpiarHtml();
    carritoDeCompra.forEach(producto => {
        const { imagen, descripcion, precioNormal, cantidad, id } = producto;
        const row = document.createElement('div');
        row.classList.add('item');

        row.innerHTML = `
            <img src="${imagen}" alt="">
            <div class="contenido_del_producto">
                <h5 class="nombre_del_producto">${descripcion}</h5>
                <h5 class="precio">$${precioNormal}</h5>
                <h6 class="cantidad">${cantidad}</h6>
            </div>
            <span class="eliminar_producto" onclick="eliminarProducto('${id}')" data-id="${id}">X</span>
        `;

        contenedorCarritoDeCompra.appendChild(row);
        precioTotal.innerHTML = totalCarrito;
        cantidadDeProducto.innerHTML = contadorDeProducto;
    });
}


function limpiarHtml() {
    contenedorCarritoDeCompra.innerHTML = '';
}

//FUNCION PARA GUARDAR EL CARRITO EN LOCALSTORAGE
function guardarCarritoEnLocalStorage() {
    //APLICACION DE JSON PARA ALAMCENAR EL CARRITO EN EL LOCALSTORAGE
    localStorage.setItem('carritoDeCompra', JSON.stringify(carritoDeCompra));
    localStorage.setItem('totalCarrito', totalCarrito);
    localStorage.setItem('contadorDeProducto', contadorDeProducto);
}

//FUNCION PARA CARGAR EL CARRITO DESDE EL LOCALSTORAGE
function cargarCarritoDesdeLocalStorage() {
    carritoDeCompra = JSON.parse(localStorage.getItem('carritoDeCompra')) || [];
    totalCarrito = JSON.parse(localStorage.getItem('totalCarrito')) || 0;
    contadorDeProducto = JSON.parse(localStorage.getItem('contadorDeProducto')) || 0;
}

//ESCUCHAR EL EVENTO 'DOMContentLoaded' Y CARGAR LA INFORMACION DEL CARRITO DESDE EL LOCALSTORAGE
document.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);