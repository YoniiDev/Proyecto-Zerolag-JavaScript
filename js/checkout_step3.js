//OBTENER ELEMENTOS DEL DOM DE LOS METODOS DE PAGO
totalTransferenciaBancoEstado = document.querySelector('#totalTransferenciaBancoEstadoId');
totalTransferenciaBancoSantander = document.querySelector('#totalTransferenciaBancoSantanderId');
totalPagoConTransferenciaODepositoBancario = document.querySelector('#totalPagoConTransferenciaODepositoBancarioId');
totalPagoConOtrosMediosDePago = document.querySelector('#totalPagoConOtrosMediosDePagoId');

//OBTENER ELEMENTOS DEL DOM DEL DETALLE DE COMPRA
const itemsDelCarritoDeCompra = document.querySelector('#itemsDelCarritoDeCompraId');
const valorTotalPagoConTransferencia = document.querySelector('#totalPagoConTransferenciaId');
const valorTotalOtrosMediosDePago = document.querySelector('#totalOtrosMediosDePagoId');

//ARRAY DE PODUCTOS DEL CARRITO DE COMPRA
let carritoDeCompra = [];

//OTRAS VARIABLES GLOBALES
let totalTransferencia = 0;
let totalOtrosMediosDePago = 0;
let cantidadDeProductos = 0;
const costoDeEnvio = 8990;

//FUNCION PARA CARGAR LA INFORMACION DEL CARRITO DESDE EL LOCALSTORAGE
document.addEventListener('DOMContentLoaded', obtenerProductosDelLocalStorage);
function obtenerProductosDelLocalStorage() {
    carritoDeCompra = JSON.parse(localStorage.getItem('carritoDeCompra')) || [];
    totalTransferencia = JSON.parse(localStorage.getItem('totalTransferencia')) || 0;
    totalOtrosMediosDePago = JSON.parse(localStorage.getItem('totalOtrosMediosDePago')) || 0;
    cantidadDeProductos = JSON.parse(localStorage.getItem('cantidadDeProductos')) || 0;

    itemsDelCarritoDeCompra.innerHTML = '';

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
                <button class="eliminar_producto_checkout" data-id="${id}">Eliminar</button>
            </div>
            <div class="informacion_del_producto">
                <p class="cantidad">Cantidad: ${cantidad}</p>
                <p class="precio_normal">Precio Normal: $<s>${precioNormal}</s></p>
                <p class="precio_con_transferencia">Precio transferencias: $${precioConTransferencia}</p>
                <p class="precio_con_otros_medios_de_pago">Otros medios de pago: $${precioConOtrosMediosDePago}</p>
            <div>
        </div> 
        `;

        itemsDelCarritoDeCompra.appendChild(item);
    });

    actualizarTotales(totalTransferencia, totalOtrosMediosDePago);
}

//FUNCION QUE AGREGA EL COSTO DE ENVIO A LOS TOTALES
function actualizarTotales(totalTransferencia, totalOtrosMediosDePago) {
    totalTransferencia += costoDeEnvio;
    totalOtrosMediosDePago += costoDeEnvio;

    //ELEMENTOS DE LA SECCION DE MEDIOS DE PAGO
    totalTransferenciaBancoEstado.innerHTML = totalTransferencia;
    totalTransferenciaBancoSantander.innerHTML = totalTransferencia;
    totalPagoConTransferenciaODepositoBancario.innerHTML = totalTransferencia;
    totalPagoConOtrosMediosDePago.innerHTML = totalOtrosMediosDePago;

    //ELEMENTOS DE LA SECCION DE DETALLE DE LA COMPRA
    valorTotalPagoConTransferencia.innerHTML = totalTransferencia;
    valorTotalOtrosMediosDePago.innerHTML = totalOtrosMediosDePago;
}

//FUNCION PARA ELIMINAR PRODUCTOS
function eliminarProductos() {
    itemsDelCarritoDeCompra.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar_producto_checkout')) {
            const idDelProductoAEliminar = e.target.dataset.id;
            carritoDeCompra = carritoDeCompra.filter((producto) => producto.id != idDelProductoAEliminar);
            actualizarDetalleDeCompra();
            actualizarTotales(totalTransferencia, totalOtrosMediosDePago);
            guardarCarritoEnLocalStorage();
        }
    })
}
eliminarProductos();

//FUNCION PARA ACUALIZAR LA INFORMACION
function actualizarDetalleDeCompra() {
    itemsDelCarritoDeCompra.innerHTML = '';

    //ELEMENTOS DEL DETALLE DE LA COMPRA
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
                    <button class="eliminar_producto_checkout" data-id="${id}">Eliminar</button>
                </div>
                <div class="informacion_del_producto">
                    <p class="cantidad">Cantidad: ${cantidad}</p>
                    <p class="precio_normal">Precio Normal: $<s>${precioNormal}</s></p>
                    <p class="precio_con_transferencia">Precio transferencias: $${precioConTransferencia}</p>
                    <p class="precio_con_otros_medios_de_pago">Otros medios de pago: $${precioConOtrosMediosDePago}</p>
                <div>
            </div>
        `;
        itemsDelCarritoDeCompra.appendChild(item);
    });

    totalTransferencia = carritoDeCompra.reduce((totalTransferencia, producto) => {
        return totalTransferencia + (parseInt(producto.precioConTransferencia) * producto.cantidad);
    }, 0);

    totalOtrosMediosDePago = carritoDeCompra.reduce((totalOtrosMediosDePago, producto) => {
        return totalOtrosMediosDePago + (parseInt(producto.precioConOtrosMediosDePago) * producto.cantidad);
    }, 0);

    cantidadDeProductos = carritoDeCompra.reduce((contadorDeProductos, producto) => {
        return contadorDeProductos + producto.cantidad
    }, 0);
}

//FUNCION PARA GUARDAR EN EL LOCAL STORAGE LAS MODIFICACIONES REALIZADAS
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carritoDeCompra', JSON.stringify(carritoDeCompra));
    localStorage.setItem('totalTransferencia', totalTransferencia);
    localStorage.setItem('totalOtrosMediosDePago', totalOtrosMediosDePago);
    localStorage.setItem('cantidadDeProductos', cantidadDeProductos);
}

//ELEMENTO DEL DOM DEL BOTON CONTINUAR
btnPagar = document.querySelector('#btnPagarId')

function mensajeDePagoRealizado() {
    btnPagar.addEventListener('click', (e) => {
        e.preventDefault();

        const pagoBancoEstado = document.querySelector('#pagoBancoEstado');
        const pagoSantander = document.querySelector('#pagoSantander');
        const pagoConTransferenciaODepositoBancario = document.querySelector('#pagoConTransferenciaODepositoBancario');
        const otrosMediosDePago = document.querySelector('#otrosMediosDePago');

        if (!pagoBancoEstado.checked && !pagoSantander.checked && !pagoConTransferenciaODepositoBancario.checked && !otrosMediosDePago.checked) {

            Swal.fire({
                title: 'Error',
                text: 'Por favor,  seleccione un método de pago antes de continuar',
                icon: 'error'
            });
            return;
        } else {
            Swal.fire({
                title: '¿Desea confirmar el Pago?',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#FF0000',
                confirmButtonColor: '#34FA05',
                confirmButtonText: 'Confirmar',
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Pago Realizado",
                        text: "La operación de pago se ha realizado satisfactoriamente",
                        icon: "success"
                    });
                }
                if (result.isDismissed && result.dismiss === 'cancel') {
                    Swal.fire({
                        title: "Pago Cancelado",
                        text: "La operación de pago ha sido cancelada por el usuario satisfactoriamente",
                        icon: "error"
                    });
                }
            });
        }
    });
}

mensajeDePagoRealizado();