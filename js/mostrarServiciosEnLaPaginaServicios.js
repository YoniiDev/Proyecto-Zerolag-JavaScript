let arrayDeServicios = [];

//FUNCION PARA LEER LISTADO DE SERVICIOS DESDE UN ARCHIVO JSON LOCAL
function obtenerServicios() {
    fetch('../js/servicios.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }else {
                Toastify({
                    text: `Hubo un problema al obtener la informacion de los servicios. Error:` + response.status,
                    duration: 8000,
                    close: true,
                    gravity: 'bottom',
                    position: 'right'
                }).showToast();
            }
        })
        .then((listaDeServicios) => {
            arrayDeServicios =listaDeServicios;
            mostrarServiciosEnLaPaginaServicios(arrayDeServicios, "contenedorDeTarjetasDeServicioId");
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
obtenerServicios();

//FUNCION PARA MOSTRAR LOS SERVICIOS EN LA PAGINA DE SERVICIOS
function mostrarServiciosEnLaPaginaServicios(arrayDeServicios, idDelContenedorDeTarjetasDeServicios) {

    let contenedorDeTarjetasDeServicioId = document.getElementById(idDelContenedorDeTarjetasDeServicios);
    if(contenedorDeTarjetasDeServicioId) {
        contenedorDeTarjetasDeServicioId.innerHTML = "";
    }else {
        Toastify({
            text: `Ocurrio un problema al tratar de mostrar los servicios, por favor, intente mas tarde`,
            duration: 8000,
            close: true,
            gravity: 'bottom',
            position: 'right'
        }).showToast();
    }

    arrayDeServicios.forEach((servicio) => {
        let tarjetaDeServicio = document.createElement("div");
        tarjetaDeServicio.classList.add("tarjeta_de_servicio");

        tarjetaDeServicio.innerHTML =`
        <img src="${servicio.imagenDelServicioPages}" alt="${servicio.altDeLaImagen}">
        <h3>${servicio.nombreDelServicio}</h3> 
        <p>${servicio.descripcionDelServicio}</p>
        <a href="#">CONTACTANOS</a>
        `  
        contenedorDeTarjetasDeServicioId.appendChild(tarjetaDeServicio);      
    })
}

