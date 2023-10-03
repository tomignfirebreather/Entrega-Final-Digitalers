//Lógica CRUD de las rutas de productos
/*  /api/products/insert
    /api/products/get
    /api/products/update
    /api/products/delete */

    const express = require('express');
    const router = express.Router();
    const {
        insertarProductos,
        buscarProductos,
        actualizarProductos,
        eliminarProductos
    } = require('../controllers/productsControllers');

    const { roleAuthenticator } = require('../middlewares/roleAuthenticator');

    router.post('/insert', roleAuthenticator(admin), insertarProductos);
    router.get('/get', roleAuthenticator(admin), buscarProductos);
    router.put('/update', roleAuthenticator(admin), actualizarProductos);
    router.delete('/delete', roleAuthenticator(admin), eliminarProductos);

    module.exports = router;