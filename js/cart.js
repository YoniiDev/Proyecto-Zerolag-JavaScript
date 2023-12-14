//ESTA INFORMACION SE COLOCO SOLA Y NO LA QUISE ELIMINAR ASI QUE LA COMENTE, POR LO QUE AVERIGUE ESTA RELACIONADO CON SASS.
/* const { info } = require("node-sass"); */

//OBTENER ELEMENTOS DEL DOOM
const contenedorDeProductos = document.querySelector('#contenedorDeProductosId');
const contenedorDeItemsDeCarritoDeProductos = document.querySelector('#contenedorDeItemsDeCarritoDeProductosId');
const precioTotal = document.querySelector('#precioTotalId');
const contadorDeProductos = document.querySelector('#contadorDeProductosId');
const iconoCarrito = document.querySelector('#iconoCarritoId');
const btnCerrarCarrito = document.querySelector('#btnCerrarCarritoId');

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
let cantidadDeProducto = 0;

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
        actualizarCarrito()
    }
}

//FUNCION PARA ELIMINAR PRODUCTOS
contenedorDeItemsDeCarritoDeProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar_producto')) {
        const eliminarId = e.target.dataset.id;
        carritoDeCompra = carritoDeCompra.filter((producto) => producto.id !== eliminarId);
        actualizarCarrito();
    }
})

//FUNCION PARA ACTUALIZAR EL CARRITO
function actualizarCarrito() {
    limpiarHtml();

    carritoDeCompra.forEach((producto) => {
        const { imagen, descripcion, precioNormal, cantidad } = producto;
        const nuevoItem = document.createElement('div');
        nuevoItem.classList.add('item');

        nuevoItem.innerHTML = `
            <img src="${imagen}" alt="">
            <div class="contenido_del_producto">
                <p class="nombre_del_producto">${descripcion}</p>
                <p class="cantidad">Cantidad: ${cantidad}</p>
                <p class="precio">Precio: $${precioNormal}</p>
            <div>
            <span class="eliminar_producto" data-id="${producto.id}">X</span>
        `;

        contenedorDeItemsDeCarritoDeProductos.appendChild(nuevoItem);
    });

    totalCarrito = carritoDeCompra.reduce((total, producto) => total + parseInt(producto.precioNormal) * producto.cantidad, 0);
    cantidadDeProducto = carritoDeCompra.reduce((contador, producto) => contador + producto.cantidad, 0);

    precioTotal.innerHTML = totalCarrito;
    contadorDeProductos.innerHTML = cantidadDeProducto;

    guardarCarritoEnLocalStorage();
}

//OBTENER INFORMACION DEL PRODUCTO
function obtenerInformacionDelProducto(producto) {
    const informacionProducto = {
        imagen: producto.querySelector("#imagenDeProductoId").src,
        descripcion: producto.querySelector("#descripcionDeProductoId").textContent,
        precioNormal: producto.querySelector("#precioNormalDeProductoId").textContent,
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
        cantidadDeProducto++;
    }
    cargarHtml();

    //ALMACENAR CARRITO EN EL LOCALSTORAGE
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
}

//CARGAR EL CONTENIDO EN EL HTML
function cargarHtml() {
    limpiarHtml();
    carritoDeCompra.forEach(producto => {
        const { imagen, descripcion, precioNormal, cantidad, id } = producto;
        const nuevoItem = document.createElement('div');
        nuevoItem.classList.add('item');

        nuevoItem.innerHTML = `
            <img src="${imagen}" alt="">
            <div class="contenido_del_producto">
                <p class="nombre_del_producto">${descripcion}</p>
                <p class="cantidad">Cantidad: ${cantidad}</p>
                <p class="precio">Precio $${precioNormal}</p>
            </div>
            <span class="eliminar_producto" data-id="${id}">X</span>
        `;

        contenedorDeItemsDeCarritoDeProductos.appendChild(nuevoItem);
        precioTotal.innerHTML = totalCarrito;
        contadorDeProductos.innerHTML = cantidadDeProducto;
    });
}


function limpiarHtml() {
    contenedorDeItemsDeCarritoDeProductos.innerHTML = '';
}

//FUNCION PARA GUARDAR EL CARRITO EN LOCALSTORAGE
function guardarCarritoEnLocalStorage() {
    //APLICACION DE JSON PARA ALAMCENAR EL CARRITO EN EL LOCALSTORAGE
    localStorage.setItem('carritoDeCompra', JSON.stringify(carritoDeCompra));
    localStorage.setItem('totalCarrito', totalCarrito);
    localStorage.setItem('cantidadDeProducto', cantidadDeProducto);
}

//FUNCION PARA CARGAR EL CARRITO DESDE EL LOCALSTORAGE
function cargarCarritoDesdeLocalStorage() {
    carritoDeCompra = JSON.parse(localStorage.getItem('carritoDeCompra')) || [];
    totalCarrito = JSON.parse(localStorage.getItem('totalCarrito')) || 0;
    cantidadDeProducto = JSON.parse(localStorage.getItem('cantidadDeProducto')) || 0;

    actualizarCarrito()
}

//ESCUCHAR EL EVENTO 'DOMContentLoaded' Y CARGAR LA INFORMACION DEL CARRITO DESDE EL LOCALSTORAGE
document.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);