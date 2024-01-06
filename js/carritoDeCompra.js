//ESTA INFORMACION SE COLOCO SOLA Y NO LA QUISE ELIMINAR ASI QUE SIMPLEMENT LA COMENTE, POR LO QUE AVERIGUE ESTA RELACIONADO CON SASS.
/* const { info } = require("node-sass"); */

//OBTENER ELEMENTOS DEL DOOM
const contenedorDeProductos = document.querySelector('#contenedorDeProductosId');
const contenedorDeItemsDeCarritoDeProductos = document.querySelector('#contenedorDeItemsDeCarritoDeProductosId');
const valorTotalPagoConTransferencia = document.querySelector('#valorTotalPagoConTransferenciaId');
const valorTotalOtrosMediosDePago = document.querySelector('#valorTotalOtrosMediosDePagoId');
const contadorDeProductos = document.querySelector('#contadorDeProductosId');
const iconoCarrito = document.querySelector('#iconoCarritoId');
const btnCerrarCarrito = document.querySelector('#btnCerrarCarritoId');

//FUNCION PARA MOSTRAR EL CARRITO DE COMPRA AL HACER CLIC EN EL ICONO DEL CARRITO
iconoCarrito.addEventListener('click', mostrarCarrito);
function mostrarCarrito() {
    const carritoDeProductos = document.getElementById("carritoDeProductosId");
    carritoDeProductos.style.display = "block";
}

//FUNCION PARA OCULTAR EL CARRITO DE COMPRA AL HACER CLIC EN EL BOTON CERRAR
btnCerrarCarrito.addEventListener('click', cerrarCarrito);
function cerrarCarrito() {
    carritoDeProductos = document.getElementById("carritoDeProductosId");
    carritoDeProductos.style.display = "none";
}

//ARRAY DE PRODUCTOS DEL CARRITO DE COMPRA
let carritoDeCompra = [];

//OTRAS VARIABLES GLOBALES
let totalTransferencia = 0;
let totalOtrosMediosDePago = 0;
let cantidadDeProductos = 0;

//FUNCION PARA AÑADIR PRODUCTOS AL CARRITO DE COMPRA
function añadirProductoAlCarrito() {
    contenedorDeProductos.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('btn_añadir_al_carrito')) {
            const tarjetaDeProducto = e.target.parentElement;
            const productoAAñadir = {
                imagen: tarjetaDeProducto.querySelector(".imagen_del_producto").src,
                descripcion: tarjetaDeProducto.querySelector(".descripcion_producto").textContent,
                tipoDeProducto: tarjetaDeProducto.querySelector(".descripcion_producto").getAttribute('data-tipoDeProducto'),
                precioNormal: tarjetaDeProducto.querySelector(".precio_normal_del_producto").textContent,
                precioConTransferencia: tarjetaDeProducto.querySelector(".precio_producto_con_transferencia").textContent,
                precioConOtrosMediosDePago: tarjetaDeProducto.querySelector(".precio_de_producto_con_otros_medios_de_pago").textContent,
                id: tarjetaDeProducto.querySelector('a').getAttribute('data-id'),
                cantidad: 1
            }

            const existeElProductoEnElCarritoDeCompra = carritoDeCompra.some((producto) => producto.id === productoAAñadir.id)
            if (existeElProductoEnElCarritoDeCompra) {
                const carritoDeCompraConNuevoProducto = carritoDeCompra.map((producto) => {
                    if (producto.id === productoAAñadir.id) {
                        producto.cantidad++;
                        return producto;
                    } else {
                        return producto;
                    }
                });
                carritoDeCompra = [...carritoDeCompraConNuevoProducto]
            } else {
                carritoDeCompra = [...carritoDeCompra, productoAAñadir]
            }

            actualizarCarrito();
            guardarCarritoEnLocalStorage();
            Toastify({
                text: `Se ha añadido el producto al carrito de compra`,
                duration: 4000,
                close: true,
                gravity: 'bottom',
                position: 'right'
            }).showToast();
        }
    });
};

añadirProductoAlCarrito();

//FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO DE COMPRA
function eliminarProductoDelCarrito() {
    contenedorDeItemsDeCarritoDeProductos.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar_producto')) {
            const idDelProductoAEliminar = e.target.dataset.id;
            carritoDeCompra = carritoDeCompra.filter((producto) => producto.id !== idDelProductoAEliminar);
            actualizarCarrito();
            guardarCarritoEnLocalStorage();
        }
    });
};

eliminarProductoDelCarrito();

//FUNCION PARA ACTUALIZAR EL CARRITO DE COMPRA
function actualizarCarrito() {
    limpiarHtml();
    carritoDeCompra.forEach((producto) => {
        const { imagen, descripcion, tipoDeProducto, precioNormal, precioConTransferencia, precioConOtrosMediosDePago, id, cantidad } = producto;
        const item = document.createElement('div');
        item.classList.add('item');

        item.innerHTML = `
            <p class="nombre_del_producto" data-tipoDeProducto="${tipoDeProducto}">${descripcion}</p>
            <div class="contenedor_de_la_imagen_y_de_la_informacion_del_producto">
                <div class="contenedor_de_la_imagen_del_producto_y_del_boton_eliminar_producto">
                    <div class="imagen_del_producto">
                        <img src="${imagen}" alt="${descripcion}">
                    </div>    
                    <button class="eliminar_producto" data-id="${id}">Eliminar</button>
                </div>
                <div class="informacion_del_producto">
                    <p class="cantidad">Cantidad: ${cantidad}</p>
                    <p class="precio_normal">Precio Normal: $<s>${precioNormal}</s></p>
                    <p class="precio_con_transferencia">Precio transferencias: $${precioConTransferencia}</p>
                    <p class="precio_con_otros_medios_de_pago">Otros medios de pago: $${precioConOtrosMediosDePago}</p>
                <div>
            </div>    
        `;
        contenedorDeItemsDeCarritoDeProductos.appendChild(item);
    });

    totalTransferencia = carritoDeCompra.reduce((totalTransferencia, producto) => {
        return totalTransferencia + (parseInt(producto.precioConTransferencia) * producto.cantidad);
    }, 0);

    totalOtrosMediosDePago = carritoDeCompra.reduce((totalOtrosMediosDePago, producto) => {
        return totalOtrosMediosDePago + (parseInt(producto.precioConOtrosMediosDePago) * producto.cantidad);
    }, 0);    

    cantidadDeProductos = carritoDeCompra.reduce((contadorDeProducto, producto) => { return contadorDeProducto + producto.cantidad }, 0);

    valorTotalPagoConTransferencia.innerHTML = totalTransferencia;
    valorTotalOtrosMediosDePago.innerHTML = totalOtrosMediosDePago;
    contadorDeProductos.innerHTML = cantidadDeProductos;
}

//FUNCION PARA LIMPIAR EL CARRITO DE PRODUCTOS
function limpiarHtml() {
    contenedorDeItemsDeCarritoDeProductos.innerHTML = '';
}

//FUNCION PARA GUARDA EL CARRITO EN EL LOCALSTORAGE
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carritoDeCompra', JSON.stringify(carritoDeCompra));
    localStorage.setItem('totalTransferencia', totalTransferencia);
    localStorage.setItem('totalOtrosMediosDePago', totalOtrosMediosDePago);
    localStorage.setItem('cantidadDeProductos', cantidadDeProductos);
}

//FUNCION PARA CARGAR EL CARRITO DESDE EL LOCALSTORAGE
document.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);
function cargarCarritoDesdeLocalStorage() {
    carritoDeCompra = JSON.parse(localStorage.getItem('carritoDeCompra')) || [];
    totalTransferencia = JSON.parse(localStorage.getItem('totalTransferencia')) || 0;
    totalOtrosMediosDePago = JSON.parse(localStorage.getItem('totalOtrosMediosDePago')) || 0;
    cantidadDeProductos = JSON.parse(localStorage.getItem('cantidadDeProductos')) || 0;

    limpiarHtml();

    carritoDeCompra.forEach((producto) => {
        const { imagen, descripcion, tipoDeProducto, precioNormal, precioConTransferencia, precioConOtrosMediosDePago, id, cantidad } = producto;
        const item = document.createElement('div');
        item.classList.add('item');

        item.innerHTML = ` 
        <p class="nombre_del_producto" data-tipoDeProducto="${tipoDeProducto}">${descripcion}</p>
        <div class="contenedor_de_la_imagen_y_de_la_informacion_del_producto">
            <div class="contenedor_de_la_imagen_del_producto_y_del_boton_eliminar_producto">
                <div class="imagen_del_producto">
                    <img src="${imagen}" alt="${descripcion}">
                </div>    
                <button class="eliminar_producto" data-id="${id}">Eliminar</button>
            </div>
            <div class="informacion_del_producto">
                <p class="cantidad">Cantidad: ${cantidad}</p>
                <p class="precio_normal">Precio Normal: $<s>${precioNormal}</s></p>
                <p class="precio_con_transferencia">Precio transferencias: $${precioConTransferencia}</p>
                <p class="precio_con_otros_medios_de_pago">Otros medios de pago: $${precioConOtrosMediosDePago}</p>
            <div>
        </div>    
        `;

        contenedorDeItemsDeCarritoDeProductos.appendChild(item);
    })

    valorTotalPagoConTransferencia.innerHTML = totalTransferencia;
    valorTotalOtrosMediosDePago.innerHTML = totalOtrosMediosDePago;
    contadorDeProductos.innerHTML = cantidadDeProductos;
}

//ELEMENTO DEL DOM DEL BOTON INICIAR PAGO
const btnIniciarPago = document.querySelector('#btnIniciarPagoId');

//FUNCION QUE COMPRUEBA SI EXISTEN PRODUCTOS EN EL CARRITO ANTES DE INICIAR EL PAGO
function verificarCarritoAntesDePagar() {
    btnIniciarPago.addEventListener('click', (e) => {
        e.preventDefault();

        if (carritoDeCompra.length === 0) {
            Swal.fire({
                title: 'El carrito esta vacio',
                text: 'Debe agregar productos al carrito antes de continuar con el pago.',
                icon: "error"
            });
        }else {
            window.location.href = "./pages/checkout.html"
        }
    });
}

verificarCarritoAntesDePagar();