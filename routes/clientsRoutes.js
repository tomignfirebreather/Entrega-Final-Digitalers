const express = require('express');
const router = express.Router();
const {
    crearPerfil,
    buscarPerfil,
    editarPerfil,
    eliminarPerfil,
    iniciarSesion,
    enviarSesion,
    cerrarSesion,
    verificarSesion,
} = require('../controllers/clientsControllers');

const { roleAuthenticator } = require('../middlewares/roleAuthenticator');
const { jwtAuthenticator } = require('../middlewares/jwtAuthenticator');

router.post('/profile/register', jwtAuthenticator(false), crearPerfil);
router.get('/profile/get', jwtAuthenticator(true), buscarPerfil);
router.put('/profile/edit', jwtAuthenticator(true), roleAuthenticator('client'), editarPerfil);
router.delete('/profile/delete', jwtAuthenticator(true), roleAuthenticator('client'), eliminarPerfil);

router.post('/session/login', jwtAuthenticator(false), iniciarSesion);
router.get('/session/login', jwtAuthenticator(true), enviarSesion);
router.get('/session/logout', jwtAuthenticator(true), cerrarSesion);
router.get('/session/state', verificarSesion);

module.exports = router;