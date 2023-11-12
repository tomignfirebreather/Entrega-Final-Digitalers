const express = require('express');
const router = express.Router();
const {
    crearPerfil,
    iniciarSesion,
    enviarSesion,
    cerrarSesion,
    editarPerfil,
    eliminarPerfil,
    buscarPerfil,
    buscarCarrito,
    buscarFavoritos
} = require('../controllers/clientsControllers');

router.post('/profile/register', crearPerfil);
router.post('/session/login', iniciarSesion);
router.get('/session/login', enviarSesion);
router.get('/session/logout', cerrarSesion);
router.get('/get/profile', buscarPerfil);
router.get('/get/cart', buscarCarrito);
router.get('/get/favorites', buscarFavoritos);
router.put('/profile/edit', editarPerfil);
router.delete('/profile/delete', eliminarPerfil);

module.exports = router;