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
                        <h3>$${data[0].productprice}</h3>
                        <div id="cantidades">
                            <div class="dropdown">
                                <button id="miBoton" class="btn btn-secondary btn-sm dropdown-toggle mt-2 mb-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Cantidad: 1 unidad
                                </button>
                                <ul class="dropdown-menu">
                                    <li><button class="dropdown-item btn-custom2 btn-interac" type="button">1 unidad</button></li>
                                    <li><button class="dropdown-item btn-custom2 btn-interac" type="button">2 unidades</button></li>
                                    <li><button class="dropdown-item btn-custom2 btn-interac" type="button">3 unidades</button></li>
                                    <li><button class="dropdown-item btn-custom2 btn-interac" type="button">4 unidades</button></li>
                                    <li><button class="dropdown-item btn-custom2 btn-interac" type="button">5 unidades</button></li>
                                </ul>
                            </div>
                            <p>(${data[0].productstock} disponibles)</p>
                        </div>
                        <div class="d-flex gap-4 w-100">
                            <button class="btn btn-custom w-100" type="button">Comprar ahora</button>
                            <button class="btn btn-custom2 w-100" type="button">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `;
            productoContainer.appendChild(producto);

            const btnInterac = document.getElementsByClassName('btn-interac');
            for (let i = 0; i < btnInterac.length; i++) {
                btnInterac[i].addEventListener('click', function() {
                    document.getElementById("miBoton").innerHTML = `Cantidad: ${btnInterac[i].innerHTML}`;
                });
            }
}