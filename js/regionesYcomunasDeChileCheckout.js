//ARRAY DE REGIONES Y COMUNAS DE CHILE
let arrayDeRegionesYComunasDeChile = [];

//ELEMENTOS DEL DOM
const regionSelect = document.getElementById('region');
const comunaSelect = document.getElementById('comuna');

//FUNCION PARA LEER LISTADO DE REGIONES Y COMUNAS DE CHILE DESDE UN ARCHIVO JSON LOCAL
function obtenerRegionesYComunasDeChile() {
    fetch('../js/regionesYComunasDeChile.json')
    .then((response) => {
        if (response.ok) {
            return response.json();
        }else {
            Toastify({
                text: `Hubo un problema al obtener la informacion de las regiones y comunas de Chile. Error:` + response.status,
                duration: 8000,
                close: true,
                gravity: 'bottom',
                position: 'right'
            }).showToast();
        }
    })
    .then((listaDeRegionesYComunasDeChile) => {
        arrayDeRegionesYComunasDeChile = listaDeRegionesYComunasDeChile;
        cargarRegionesDeChile()
        regionSelect.addEventListener('change', cargarComunasDeChile);
    })
    .catch((error) => {
        Toastify({
            text: `Hubo un problema en el servidor intente nuevamente mas tarde. Error ${error}`,
            duration: 8000,
            close: true,
            gravity: 'bottom',
            position: 'right'
        }).showToast();
    })
}
obtenerRegionesYComunasDeChile();

// FUNCION PARA CARGAR LAS OPCIONES DE REGIONES DE CHILE
function cargarRegionesDeChile() {
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione una región';
    regionSelect.appendChild(defaultOption);

    arrayDeRegionesYComunasDeChile.forEach((region) => {
        const option = document.createElement('option');
        option.value = region.NombreRegion;
        option.textContent = region.NombreRegion;
        regionSelect.appendChild(option);
    });
}

// FUNCION PARA CARGAR LAS OPCIONES DE COMUNAS DE CHILE
function cargarComunasDeChile() {
    const regionSeleccionada = regionSelect.value;

    comunaSelect.innerHTML = '';

    informacionDeRegionSeleccionada = arrayDeRegionesYComunasDeChile.find((region) =>{
        return region.NombreRegion === regionSeleccionada;
    });

    if (informacionDeRegionSeleccionada) {
        informacionDeRegionSeleccionada.comunas.forEach((comunas) =>{
            const option = document.createElement('option');
            option.value = comunas;
            option.textContent = comunas;
            
            comunaSelect.appendChild(option);
        });
    }
}

