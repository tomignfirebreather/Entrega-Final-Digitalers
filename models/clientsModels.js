const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoUrlAtlas = process.env.MONGO_URL_ATLAS;
const dbName = 'dbBarte';
const client = new MongoClient(mongoUrlAtlas);

const validarData = async function (username, useremail, userpass, userpassconfirm) {
    if (userpass === userpassconfirm) {
        try {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection('usuarios');
            if(await collection.findOne({useremail}) == null){
                if(await collection.findOne({username}) == null){
                    return { success: true };
                } else {return { success: false, error: 'Este nombre de usuario ya está en uso' }}
            } else {return { success: false, error: 'Este email ya está en uso' }}
        } catch (error) {
            return { success: false, error_db: 'Ocurrio un error al conectarse a MongoDB: ' + error };
        } finally {
            await client.close();
        }
    } else {
        return { success: false, error: 'Las contraseñas no coinciden' };
    }
};

const guardarPerfil = async function (username, useremail, userpass, userroltype) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(userpass, salt);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('usuarios');
        await collection.insertOne({
            username: username,
            useremail: useremail,
            userpass: hashpass,
            userroltype: userroltype
        });
        return {success: true};
    } catch (error) {
        return { success: false, error_db: 'Ocurrio un error al conectarse a MongoDB: ' + error };
    } finally {
        await client.close();
    }
};

const validarPerfil = async function (useremail, userpass) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('usuarios');
        const userinfo = await collection.findOne({useremail});
        if(userinfo !== null){
            if(await bcrypt.compare(userpass, userinfo.userpass)){
                return { success: true, username: userinfo.username, useremail: userinfo.useremail, userroltype: userinfo.userroltype};
            } else {return { success: false, error: 'Contraseña incorrecta' }}
        } else {return { success: false, error: 'No se registra un perfil con ese email' }}
    } catch (error) {
        return { success: false, error_db: 'Ocurrio un error al conectarse a MongoDB: ' + error };
    } finally {
        await client.close();
    }
};

module.exports = {
    validarData,
    guardarPerfil,
    validarPerfil
};