const express = require('express');
const router = express.Router();
const {
    insertarProductos,
    buscarProductos,
    buscarTotalProductos,
    actualizarProductos,
    eliminarProductos
} = require('../controllers/productsControllers');

const { roleAuthenticator } = require('../middlewares/roleAuthenticator');

router.post('/insert', roleAuthenticator('admin'), insertarProductos);
router.get('/get', /* roleAuthenticator('admin'), */ buscarProductos);
router.get('/getAll', buscarTotalProductos);
router.put('/update', roleAuthenticator('admin'), actualizarProductos);
router.delete('/delete', roleAuthenticator('admin'), eliminarProductos);

module.exports = router;