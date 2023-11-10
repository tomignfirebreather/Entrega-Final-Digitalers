var productos = [];

fetch('/products/getAll')
    .then(response => response.json())
    .then(res => {
        productos = res.data;
        const productosContainer = document.getElementById('columnaProductos');
        res.data.forEach(data => {
            const producto = document.createElement('div');
            producto.innerHTML = `
                <div class="producto" id="${data._id}">
                    <div class="imagenProducto">
                        <img src="${data.productimage}" alt="${data.productname}">
                    </div>
                    <div class="descripcionProducto">
                        <h2>${data.productname}</h2>
                        <p>${data.productdescription}</p>
                        <button type="button" class="btn btn-custom buscarProducto">Ver Producto</button>
                    </div>
                </div>
            `;
            productosContainer.appendChild(producto);
        });
        const buscarProducto = document.getElementsByClassName('buscarProducto');
        for (var i = 0; i < buscarProducto.length; i++) {
            buscarProducto[i].addEventListener('click', function(e) {
                var id = e.target.parentNode.parentNode.id;
                var producto = productos.filter(producto => producto._id === id);
                localStorage.setItem('producto', JSON.stringify(producto));
                window.location.href = '/pages/infoProducto.html';
            })
        }
    });
