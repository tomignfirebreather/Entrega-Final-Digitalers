fetch('/products/getAll')
    .then(response => response.json())
    .then(res => {
        console.log(res.data);
        const productosContainer = document.getElementById('columnaProductos');
        res.data.forEach(data => {
            const producto = document.createElement('div');
            producto.innerHTML = `
                <div class="producto">
                    <div class="imagenProducto">
                        <img src="${data.productimage}" alt="${data.productname}">
                    </div>
                    <div class="descripcionProducto">
                        <h2>${data.productname}</h2>
                        <p>${data.productdescription}</p>
                        <a href="#" class="btn btn-primary">Ver Producto</a>
                    </div>
                </div>
            `;
            productosContainer.appendChild(producto);
        });
    });