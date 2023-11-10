window.onload = function() {
    var data = JSON.parse(localStorage.getItem('producto'));
    const productoContainer = document.getElementById('seccionProductos');
    const producto = document.createElement('div');
            producto.innerHTML = `
                <div class="producto" id="${data[0]._id}">
                    <div class="imagenProducto">
                        <img src="${data[0].productimage}" alt="${data[0].productname}">
                    </div>
                    <div class="descripcionProducto">
                        <h2>${data[0].productname}</h2>
                        <p>${data[0].productdescription}</p>
                        <div class="d-flex gap-4 w-100">
                            <button class="btn btn-custom w-100" type="button">Comprar ahora</button>
                            <button class="btn btn-custom2 w-100" type="button">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `;
            productoContainer.appendChild(producto);
}