// Productos disponibles
const productos = [
    { id: 1, nombre: "Smartphone XYZ", precio: 499.99, imagen: "./images/Smarthone.png" },
    { id: 2, nombre: "Laptop Pro", precio: 999.99, imagen: "C:\Pagina de compras\Alapto.png" },
    { id: 3, nombre: "Auriculares Inalámbricos", precio: 79.99, imagen: "C:\Pagina de compras\Audifono.png" },
    { id: 4, nombre: "Smartwatch Sport", precio: 199.99, imagen: "C:\Pagina de compras\Smartwatch.png" }
];

let carrito = [];

// Cargar productos en la tienda
function cargarProductos() {
    const contenedorProductos = document.getElementById("productos");
    contenedorProductos.innerHTML = productos
        .map(
            (producto) => `
        <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        </div>
    `
        )
        .join("");
}

// Agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find((p) => p.id === id);
    const item = carrito.find((i) => i.id === id);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
    const contenedorCarrito = document.getElementById("carrito-items");
    const totalElement = document.getElementById("total");

    contenedorCarrito.innerHTML = carrito
        .map(
            (item) => `
        <div class="carrito-item">
            <span>${item.nombre} (x${item.cantidad})</span>
            <button class="eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        </div>
    `
        )
        .join("");

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    totalElement.textContent = total.toFixed(2);
    actualizarContadorCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter((item) => item.id !== id);
    actualizarCarrito();
}

// Actualizar contador de productos
function actualizarContadorCarrito() {
    const contador = document.querySelector(".cart-count");
    contador.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
}

// Mostrar/ocultar carrito
function toggleCarrito() {
    const carritoElement = document.getElementById("carrito");
    carritoElement.classList.toggle("visible");
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("¡Gracias por tu compra!");
    carrito = [];
    actualizarCarrito();
}

// Inicializar
window.onload = cargarProductos;
