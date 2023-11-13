fetch('/clients/session/state')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.message === 'Sesión inactiva') {
            const navbar = document.getElementById('navbar');
            contenidoExistente = navbar.innerHTML;
            navbar.innerHTML = contenidoExistente + `
                <a id="crearCuenta" href="/pages/crearCuenta.html">
                    <li>Creá tu cuenta</li>
                </a>
                <a id="sesion" href="/pages/iniciarSesion.html">
                    <li>Ingresá</li>
                </a>
                <a href="">
                    <li>
                        <span class="material-symbols-outlined">
                            shopping_cart
                        </span>
                    </li>
                </a>
            `
        } else {
            const navbar = document.getElementById('navbar');
            contenidoExistente = navbar.innerHTML;
            navbar.innerHTML = contenidoExistente + `
                <a id="sesion" href="/clients/session/logout">
                    <li>Cerrar sesión</li>
                </a>
                <a href="">
                    <li>
                        <span class="material-symbols-outlined">
                            shopping_cart
                        </span>
                    </li>
                </a>
            `
        }
    })