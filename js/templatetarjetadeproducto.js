listaDeProductos.forEach((producto) => {
    let contenedorDeTarjetasDeProducto = document.createElement("div");
    contenedorDeTarjetasDeProducto.classList.add(nombreDeLaClaseDeLaTarjetaDeProducto);


    contenedorDeTarjetasDeProducto.innerHTML = `
    <img id="imagenDeProductoId" src="${producto.imagenDelProducto}" alt="${producto.descripcionDeProducto}">
    <h3>${producto.marcaDeProducto}</h3>
    <p class="ofertas_imperdibles_descripcion_producto" id="descripcionDeProductoId">${producto.descripcionDeProducto}</p>
    <div class="ofertas_imperdibles_precio_normal_y_porcentaje_de_descuento_contenedor">
        <p class="ofertas_imperdibles_porcentaje_de_descuento">${producto.descuentoDeProducto * 100}% descuento</p>
        <p class="ofertas_imperdibles_precio_normal">${producto.precioNormalDeProducto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
    </div>
    <p class="ofertas_imperdibles_precio_producto_con_transferencia">Transferencia ${producto.precioTransferenciaDeProducto.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>
    <p class="ofertas_imperdibles_precio_producto_otros_medios_de_pago">Otros medios de pago ${producto.precioOtrosMediosDePagoDeProducto.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>
    <a href="#" class="btn_añadir_al_carrito" data-id="1">COMPRAR</a>
    
    `
    categoriaId.appendChild(contenedorDeTarjetasDeProducto)
});











//NOTA PARA EL EVALUADOR: COMPRENDO QUE TAL VEZ LA SIGUIENTE FUNCION NO SEA LA MÁS OPTIMA DEBIDO A QUE TIENE MUCHOS PARAMETROS. NO OBSTANTE, AL LLEGAR A ESTE PUNTO DE MI PROYECTO, ME VI EN LA NECESIDAD DE TENER QUE ELEGIR UNA ALTERNATIVA DE ENTRE DOS OPCIONES. LA PRIMERA CONSISTIA EN REESTRUCTURAR GRAN PARTE DEL INDEX DEL HTML JUNTO CON EL NEXTING EN SASS Y LA SEGUNDA EN CREAR ESTA FUNCION CON VARIOS PARAMETROS. ANTE LA NECESIDAD DE LOGRAR CUMPLIR CON EL PLAZO DE ENTREGA DEL PROYECTO, OPTE POR LA OPCION DE CREAR ESTA FUNCION, YA QUE DE ESTA MANERA GANABA MAS TIEMPO A FAVOR PERMITIENDOME ENFOCARME EN EL RESTO DE LA FUNCIONALIDAD DEL CARRITO DE COMPRA. ESTE INCONVENIENTE SE ME GENERÓ PORQUE CUANDO CREE LAS TARJETAS DE PRODUCTO, LE ASIGNE NOMBRES DE CLASES DISTINTOS, HACIENDO REFERENCIA A LA CATEGORIA EN DONDE SE ENCONTRABAN, YA SEA EN LA CATEGORIA OFERTAS IMPERDIBLES O EN TE PUEDE INTERESAR. NO OBSTANTE, A PESAR DE TODO ESTO, TENDRE EN CUENTA ESTA EXPERIENCIA A LA HORA DE MAQUETAR FUTUROS PROYECTOS, PARA ASIGNAR CLASES DE ESTILOS MAS GENERICAS A LAS TRAJETAS DE PRODUCTO. CREO QUE EL APRENDIZAJE EN BASE A ESTE TIPO DE EXPERIENCIA ES CLAVE PARA SEGUIR APRENDIENDO, ESPERO ME LOGREN COMPRENDER, SALUDOS.