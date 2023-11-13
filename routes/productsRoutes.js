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
const { jwtAuthenticator } = require('../middlewares/jwtAuthenticator');

router.post('/insert', jwtAuthenticator(true), roleAuthenticator('admin'), insertarProductos);
router.get('/get', jwtAuthenticator(false), buscarProductos);
router.get('/getAll', jwtAuthenticator(false), buscarTotalProductos);
router.put('/update', jwtAuthenticator(true), roleAuthenticator('admin'), actualizarProductos);
router.delete('/delete', jwtAuthenticator(true), roleAuthenticator('admin'), eliminarProductos);

module.exports = router;