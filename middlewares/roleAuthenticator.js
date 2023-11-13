function roleAuthenticator(role) {
    return function(req, res, next) {
        if(req.session.userroltype === role) {
            next();
        } else {
            return res.status(403).send({message: 'Usted no está autorizado para acceder a este recurso'});
        }
    }
}

module.exports = { roleAuthenticator };