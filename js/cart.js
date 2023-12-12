const { info } = require("node-sass");

function showCart(x) {
    document.getElementById("carritoDeProductosId").style.display = "block";
}

function closeBtn() {
    document.getElementById("carritoDeProductosId").style.display = "none";
}

//OBTENER ELEMENTOS DEL DOOM
let contenedorDeProductos = document.querySelector('.contenedor_de_productos');
let contenedorCarritoDeCompra = document.querySelector('.card_items');
let precioTotal = document.querySelector('.precio_total');
let cantidadDeProducto = document.querySelector('.contador_de_productos');

//ARRAY DE CARRITO DE COMPRA
let carritoDeCompra = [];
let totalCarrito = 0;
let contadorDeProducto = 0;

//ESCUCHAR EVENTOS
loadEventListener();
function loadEventListener() {
    contenedorDeProductos.addEventListener('click', añadirProducto);
    contenedorCarritoDeCompra.addEventListener('click', añadirProducto)
}

//AÑADIR PRODUCTO
function añadirProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn_añadir_al_carrito')) {
        const selecionProducto = e.target.parentElement;
        readTheContent(selecionProducto);
    }
}

function eliminarPrducto(e) {
    if (e.target.classList.contains('eliminar_producto')) {
        const eliminarId = e.target.getAttribute('data-id');

        carritoDeCompra.forEach((value) => {
            if (value.id == eliminarId) {
                let reducirPrecio = parseFloat(value.precioNormal) * parseFloat(value.cantidad);
                totalCarrito = totalCarrito - reducirPrecio;
                totalCarrito = totalCarrito.toFixed(2);
            }
        });

        carritoDeCompra = carritoDeCompra.filter((producto) => producto.id !== eliminarId);

        contadorDeProducto--;
    }

    if (carritoDeCompra.length === 0) {
        precioTotal.innerHTML = 0;
        cantidadDeProducto.innerHTML = 0;

    }
    loadHtml();
}

//OBTENER INFORMACION DEL PRODUCTO
function readTheContent(product) {
    const informacionProducto = {
        imagen: product.querySelector(".imagen_de_producto").src,
        descripcion: product.querySelector(".descripcion_producto").textContent,
        precioNormal: product.querySelector('.precio_normal').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    totalCarrito = parseFloat(totalCarrito) + parseFloat(informacionProducto.precioNormal);
    totalCarrito = totalCarrito.toFixed(2);

    const existencia = carritoDeCompra.some((producto) => producto.id === informacionProducto.id);
    if (existencia) {
        const product = carritoDeCompra.map((producto) => {
            if (producto.id === informacionProducto.id) {
                producto.cantidad++;
                return product;
            } else {
                return product
            }
        });
        carritoDeCompra = [...product]
    } else {
        carritoDeCompra = [...carritoDeCompra, informacionProducto]
        contadorDeProducto++;
    }
    loadHtml();
}

function loadHtml() {
    clearHtml();
    carritoDeCompra.forEach(producto => {
        const { imagen, descripcion, precioNormal, cantidad, id } = producto;
        const row = document.createElement('div');
        row.classList.add('.tarjeta_de_producto');
        row.innerHTML = `
            <img src="${imagen}" alt="">
            <div class="contenido_del_producto">
                <h5 class="nombre_del_producto">${descripcion}</h5>
                <h5 class="precio">${precioNormal}</h5>
                <h6 class="cantidad">${cantidad}</h6>
            </div>
            <span class="eliminar_producto" data-id="${id}">X</span>
        `;

        contenedorCarritoDeCompra.appendChild(row);
        precioTotal.innerHTML = totalCarrito;
        cantidadDeProducto.innerHTML = contadorDeProducto;
    });
}

function clearHtml(){
    contenedorCarritoDeCompra.innerHTML = '';
}