let arrayDeProductos = [];

//FUNCION PARA LEER LISTADO DE PRODCUTOS DESDE UN ARCHIVO JSON LOCAL
function obtenerProductos() {
    fetch('../js/productos.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                Toastify({
                    text: `Hubo un problema al obtener la informacion de los productos. Error:` + response.status,
                    duration: 8000,
                    close: true,
                    gravity: 'bottom',
                    position: 'right'
                }).showToast();
            }
        })
        .then((listaDeProductos) => {
            arrayDeProductos = listaDeProductos;
            mostrarProductosEnLaPaginaProductos(arrayDeProductos, "productosContendedorId"); //arreglar el nombre de esta clase

        })
        .catch((error) => {
            Toastify({
                text: `Hubo un problema en el servidor intente nuevamente mas tarde. Error ${error}`,
                duration: 8000,
                close: true,
                gravity: 'bottom',
                position: 'right'
            }).showToast();
        });
}
obtenerProductos()

//FUNCION PARA MOSTRAR TODOS LOS PRODUCTOS EN LA PÁGINA DE PRODUCTOS
function mostrarProductosEnLaPaginaProductos(arrayDeProductos, idDelContenedorDeTarjetasDeProducto) {
    let productosContenededorId = document.getElementById(idDelContenedorDeTarjetasDeProducto);
    if (productosContenededorId) {
        productosContenededorId.innerHTML = "";
    } else {
        Toastify({
            text: `Ocurrio un problema al tratar de mostrar los productos, por favor, intente mas tarde`,
            duration: 8000,
            close: true,
            gravity: 'bottom',
            position: 'right'
        }).showToast();
    }

    arrayDeProductos.forEach((producto) => {
        let tarjetaDeProducto = document.createElement("div");
        tarjetaDeProducto.classList.add("tarjetas_de_productos_productos");

        tarjetaDeProducto.innerHTML = `
        <img id="imagenDeProductoId" src="${producto.imagenDelProductoPages}" alt="${producto.descripcionDeProducto}">
        <h3>${producto.marcaDeProducto}</h3>
        <p class="productos_descripcion_producto">${producto.descripcionDeProducto}</p>
        <div class="productos_precio_normal_y_porcentaje_de_descuento_contenedor">
            <p class="productos_porcentaje_de_descuento">${producto.descuentoDeProducto * 100}% descuento</p>
            <p class="productos_precio_normal">$${producto.precioNormalDeProducto}</p>
        </div>
        <p class="producto_precio_producto_con_transferencia">Transferencia $${producto.precioTransferenciaDeProducto}</p>
        <p class="producto_precio_producto_otros_medios_de_pago">Otros medios de pago $${producto.precioOtrosMediosDePagoDeProducto}</p>
        <a href="#" class="btn_añadir_al_carrito" data-id="${producto.idDeProducto}">COMPRAR</a>
        `
        // agregar la clase del boton en SASS
        productosContenededorId.appendChild(tarjetaDeProducto)
    });
}
