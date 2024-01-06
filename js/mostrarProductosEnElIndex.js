let arrayDeProductos = [];

//FUNCION PARA LEER LISTADO DE PRODUCTOS DESDE UN ARCHIVO JSON LOCAL
function obtenerProductos() {
    fetch('./js/productos.json')
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
            mostrarProductosEnOfertasImperdibles(arrayDeProductos, "productosOfertasImperdiblesId");
            mostrarProductosEnTePuedeInteresar(arrayDeProductos, "productosTePuedeInteresarId");
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

//FUNCION PARA MOSTRAR PRODUCTOS EN LA SECCION DE OFERTAS IMPEDIBLES
function mostrarProductosEnOfertasImperdibles(arrayDeProductos, idDelContenedorDeTarjetasDeProducto) {
    let arrayOfertasImperdibles = arrayDeProductos.filter((producto) => producto.categoriaOfertasImperdibles);

    const productosOfertasImperdiblesId = document.getElementById(idDelContenedorDeTarjetasDeProducto);
    if (productosOfertasImperdiblesId) {
        productosOfertasImperdiblesId.innerHTML = "";
    } else {
        Toastify({
            text: `Ocurrio un problema al tratar de mostrar los productos, por favor, intente mas tarde`,
            duration: 8000,
            close: true,
            gravity: 'bottom',
            position: 'right'
        }).showToast();
    }

    arrayOfertasImperdibles.forEach((producto) => {
        let tarjetaDeProducto = document.createElement("div");
        tarjetaDeProducto.classList.add("tarjetas_de_producto_ofertas_imperdibles");

        tarjetaDeProducto.innerHTML = `
        <img class="imagen_del_producto" src="${producto.imagenDelProductoIndex}" alt="${producto.descripcionDeProducto}">
        <h3>${producto.marcaDeProducto}</h3>
        <p class="ofertas_imperdibles_descripcion_producto descripcion_producto" data-tipoDeProducto="${producto.tipoDeProducto}">${producto.descripcionDeProducto}</p>
        <div class="ofertas_imperdibles_precio_normal_y_porcentaje_de_descuento_contenedor">
            <p class="ofertas_imperdibles_porcentaje_de_descuento">${producto.descuentoDeProducto * 100}% descuento</p>
            <p class="ofertas_imperdibles_precio_normal">$<s class="precio_normal_del_producto">${producto.precioNormalDeProducto}</s></p>
        </div>
        <p class="ofertas_imperdibles_precio_producto_con_transferencia">Transferencia $<span class="precio_producto_con_transferencia">${producto.precioTransferenciaDeProducto}</span></p>
        <p class="ofertas_imperdibles_precio_producto_otros_medios_de_pago">Otros medios de pago $<span class="precio_de_producto_con_otros_medios_de_pago">${producto.precioOtrosMediosDePagoDeProducto}</span></p>
        <a href="#" class="btn_añadir_al_carrito" data-id="${producto.idDeProducto}">COMPRAR</a>
        `
        productosOfertasImperdiblesId.appendChild(tarjetaDeProducto)
    });
}

//SE MOSTRARAN PRODUCTOS SEGUN EL HISTORIAL DE COMPRAS DEL CLIENTE BASADO EN EL LOCAL STORAGE SI NO HAY PRODUCTOS ALAMACENADOS EN EL LOCAL STORAGE, SE MOSTRARAN PRODUCTOS ALEATORIOS DEL ARRAY DE PRODUCTOS

//FUNCION PARA MOSTRAR PRODUCTOS EN LA CATEGORIA TE PUEDE INTERESAR

function mostrarProductosEnTePuedeInteresar(arrayDeProductos, idDelContenedorDeTarjetasDeProducto) {

    const carritoDeCompra = JSON.parse(localStorage.getItem('carritoDeCompra')) || [];
    const interesesDelUsuario = carritoDeCompra.map((producto) => producto.tipoDeProducto);
    let arrayTePuedeInteresar = arrayDeProductos.filter((producto) => interesesDelUsuario.includes(producto.tipoDeProducto));

    const productosTePuedeInteresarId = document.getElementById(idDelContenedorDeTarjetasDeProducto);
    if (productosTePuedeInteresarId) {
        productosTePuedeInteresarId.innerHTML = "";
    } else {
        Toastify({
            text: `Ocurrio un problema al tratar de mostrar los productos, por favor, intente mas tarde`,
            duration: 8000,
            close: true,
            gravity: 'bottom',
            position: 'right'
        }).showToast();
    }

    if (arrayTePuedeInteresar != "") {
        arrayTePuedeInteresar.forEach((producto) => {
            let tarjetaDeProducto = document.createElement("div");
            tarjetaDeProducto.classList.add("tarjetas_de_producto_te_puede_interesar");

            tarjetaDeProducto.innerHTML = `
            <img class="imagen_del_producto" src="${producto.imagenDelProductoIndex}" alt="${producto.descripcionDeProducto}">
            <h3>${producto.marcaDeProducto}</h3>
            <p class="te_puede_interesar_descripcion_producto descripcion_producto" data-tipoDeProducto="${producto.tipoDeProducto}">${producto.descripcionDeProducto}</p>
            <div class="te_puede_interesar_precio_normal_y_porcentaje_de_descuento_contenedor">
                <p class="te_puede_interesar_porcentaje_de_descuento">${producto.descuentoDeProducto * 100}% descuento</p>
                <p class="te_puede_interesar_precio_normal">$<s class="precio_normal_del_producto">${producto.precioNormalDeProducto}</s></p>
            </div>
            <p class="te_puede_interesar_precio_producto_con_transferencia">Transferencia $<span class="precio_producto_con_transferencia">${producto.precioTransferenciaDeProducto}</span></p>
            <p class="te_puede_interesar_precio_producto_otros_medios_de_pago">Otros medios de pago $<span class="precio_de_producto_con_otros_medios_de_pago">${producto.precioOtrosMediosDePagoDeProducto}</span></p>
            <a href="#" class="btn_añadir_al_carrito" data-id="${producto.idDeProducto}">COMPRAR</a>
            `
            productosTePuedeInteresarId.appendChild(tarjetaDeProducto);
        });
    }else {
        const cantidadProductosAleatorio = 4;
        arrayTePuedeInteresar = obtenerProductosAleatorios(arrayDeProductos, cantidadProductosAleatorio);

        function obtenerProductosAleatorios(arrayDeProductos, cantidadProductosAleatorio) {
            const productosAleatorios = [];
            const copiaArrayDeProductos = [...arrayDeProductos]; 
            
            for (let i = 0; i < cantidadProductosAleatorio; i++){
                if (copiaArrayDeProductos.length > 0) {
                    const indiceAleatorio = Math.floor(Math.random() * copiaArrayDeProductos.length);
                    const productoAleatorio = copiaArrayDeProductos.splice(indiceAleatorio, 1)[0];
                    productosAleatorios.push(productoAleatorio);
                }else {
                    break;
                }
            }

            return productosAleatorios;
        }

        arrayTePuedeInteresar.forEach((producto) => {
            let tarjetaDeProducto = document.createElement("div");
            tarjetaDeProducto.classList.add("tarjetas_de_producto_te_puede_interesar")

            tarjetaDeProducto.innerHTML = `
            <img class="imagen_del_producto" src="${producto.imagenDelProductoIndex}" alt="${producto.descripcionDeProducto}">
            <h3>${producto.marcaDeProducto}</h3>
            <p class="te_puede_interesar_descripcion_producto descripcion_producto" data-tipoDeProducto="${producto.tipoDeProducto}">${producto.descripcionDeProducto}</p>
            <div class="te_puede_interesar_precio_normal_y_porcentaje_de_descuento_contenedor">
                <p class="te_puede_interesar_porcentaje_de_descuento">${producto.descuentoDeProducto * 100}% descuento</p>
                <p class="te_puede_interesar_precio_normal">$<s class="precio_normal_del_producto">${producto.precioNormalDeProducto}</s></p>
            </div>
            <p class="te_puede_interesar_precio_producto_con_transferencia">Transferencia $<span class="precio_producto_con_transferencia">${producto.precioTransferenciaDeProducto}</span></p>
            <p class="te_puede_interesar_precio_producto_otros_medios_de_pago">Otros medios de pago $<span class="precio_de_producto_con_otros_medios_de_pago">${producto.precioOtrosMediosDePagoDeProducto}</span></p>
            <a href="#" class="btn_añadir_al_carrito" data-id="${producto.idDeProducto}">COMPRAR</a>
            `;

            productosTePuedeInteresarId.appendChild(tarjetaDeProducto);
        });
    }
}


