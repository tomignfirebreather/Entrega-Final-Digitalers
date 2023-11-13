const path = require('path');

const {
    validarData,
    guardarPerfil,
    validarPerfil,
    generarJWT
} = require('../models/clientsModels');
const { log } = require('console');

const crearPerfil = async (req, res) => {
    var username = req.body.name;
    var useremail = req.body.email;
    var userpass = req.body.pass;
    var userpassconfirm = req.body.passconfirm;
    var userroltype = 'client';
    let resultado = await validarData(username, useremail, userpass, userpassconfirm);

    if (resultado.success) {
        resultado = await guardarPerfil(username, useremail, userpass, userroltype);
        if(resultado.success) {
            const token = await generarJWT(useremail);
            req.session.username = username;
            req.session.useremail = useremail;
            req.session.userroltype = userroltype;
            req.session.token = token;
            res.set({ 'token': token });
            res.status(302).redirect('/clients/session/login');
        } else {
            res.status(400).send({
                message: resultado.error_db
            });
        }
    } else if(resultado.error_db !== undefined) {
        res.status(400).send({
            message: resultado.error_db
        });
    } else {
        res.status(500).send({
            message: resultado.error
        });
    }
};
const iniciarSesion = async (req, res) => {
    log(req.body);
    var useremail = req.body.email;
    var userpass = req.body.pass;
    const resultado = await validarPerfil(useremail, userpass);

    if (resultado.success){
        const token = await generarJWT(useremail);
        req.session.username = resultado.username;
        req.session.useremail = resultado.useremail;
        req.session.userroltype = resultado.userroltype;
        req.session.token = token;
        res.set({ 'token': token });
        res.status(302).redirect('/clients/session/login');
    } else if(resultado.error_db !== undefined) {
        res.status(400).send({
            message: resultado.error_db
        });
    } else {
        res.status(500).send({
            message: resultado.error
        });
    }
};
const enviarSesion = async (req, res) => {
    if (req.session.userroltype == 'admin') {
        res.sendFile(path.join(__dirname, '../public/pages/admin.html'));
    } else if (req.session.userroltype == 'client'){
        res.sendFile(path.join(__dirname, '../public/index.html'));
    } else {
        res.status(400).send({
            message: 'Error al iniciar sesión'
        });
    }
};
const verificarSesion = async (req, res) => {
    const token = req.session.token;
    if (token === undefined || token === null) {
        res.status(400).json({
            message: 'Sesión inactiva'
        });
    } else {
        res.status(200).json({
            message: 'Sesión activa'
        });
    }
}
const cerrarSesion = async (req, res) => {
    req.session.destroy();
    res.removeHeader('token');
    res.redirect('/');
};
const editarPerfil = async (req, res) => {
};
const eliminarPerfil = async (req, res) => {
};
const buscarPerfil = async (req, res) => {
};
const buscarCarrito = async (req, res) => {
};
const buscarFavoritos = async (req, res) => {
};

module.exports = {
    crearPerfil,
    iniciarSesion,
    enviarSesion,
    cerrarSesion,
    verificarSesion,
    editarPerfil,
    eliminarPerfil,
    buscarPerfil,
    buscarCarrito,
    buscarFavoritos
};