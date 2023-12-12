//ELEMENTOS DEL DOOM
const seleccionDeProductos = document.getElementById('seleccionDeProductos');

//ARRAY DE PRODUCTOS Y CARRITO DE COMPRA
let productos = [];
let carritoDeCompra = [];

//CREACION DE PRODUCTOS
productos.push(new Producto("Enfriamiento Liquido ID-Cooling", "ID-Cooling", "Enfriamiento Liquido ID-Cooling FrostFlow X, 280mm, Intel/AMD, Color Negro", 109990));
productos.push(new Producto("Unidad de Estado Sólido Kingston", "KINGSTON", "Unidad de Estado Sólido Kingston NV2, 1TB NVMe, PCIe 4.0, Lectura 3500 MB/s Escritura", 109990));
productos.push(new Producto("Mouse Gamer Logitech G Pro", "LOGITECH G", "Mouse Gamer Logitech G Pro, Sensor HERO 16K para eSports, 6 botones programables", 34990));
productos.push(new Producto('Monitor Curvo de 24" AOC', "AOC", 'Monitor Curvo de 24" AOC C24G2, Panel VA, 165Hz, 1ms, FreeSync Premium', 249990, 100));

//ENVIAR DATOS AL LOCALSTORAGE
localStorage.setItem('productos', JSON.stringify(productos));

//RECUPERAR DATOS DEL LOCALSTORAGE E IMPRESION POR CONSOLA
function recuperarProductosDelLocalStorage() {
    productosDelLocalStorage = JSON.parse(localStorage.getItem('productos'));
    console.log(productosDelLocalStorage);
}

recuperarProductosDelLocalStorage();

function agregarProductosAlSeleccionador() {
    productos.forEach((producto, index) => {
        let option = document.createElement('option');
        option.textContent = `${producto.nombre} : $${producto.precioNormal}`;
        option.value = index;
        seleccionDeProductos.appendChild(option);
    });
}

agregarProductosAlSeleccionador()
