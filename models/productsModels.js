const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoUrlAtlas = process.env.MONGO_URL_ATLAS;
const dbName = 'dbBarte';
const client = new MongoClient(mongoUrlAtlas);

const buscarData = async function (data) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('productos');

        for (let key in data) {
            let value = data[key];
            let query = {};
            if (key === 'productID') {
                query[key] = new ObjectId(value);
            } else {
                query[key] = value;
            }
            result = await collection.findOne(query);
            if(result !== null){
                return { success: 'sidata', producto: result};
            }
        }
        return { success: 'nodata' };
    } catch (error) {
        return { success: 'error', error_db: 'Ocurrio un error al conectarse a MongoDB: ' + error };
    } finally {
        await client.close();
    }
};

const guardarData = async function (data) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('productos');
        await collection.insertOne(data);
        return {success: true};
    } catch (error) {
        return { success: false, error_db: 'Ocurrio un error al conectarse a MongoDB: ' + error };
    } finally {
        await client.close();
    }
};

const actualizarData = async function (data) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('productos');
        const productID = data.productID;
        delete data.productID;
        for (let prop in data) {
            if (data[prop] === null) {
                delete data[prop];
            }
        }
        const result = await collection.updateOne({_id: new ObjectId(productID)}, {$set: data});
        if (result.modifiedCount !== 0) {
            return { success: true};
        } else {
            return { success: false, error_db: 'No se pudo actualizar el producto solicitado' };
        }
    } catch (error) {
        return { success: false, error_db: 'Ocurrio un error al conectarse a MongoDB: ' + error };
    } finally {
        await client.close();
    }
};

const eliminarData = async function (data) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('productos');
        const result = await collection.deleteOne({_id: new ObjectId(data.productID) });
        if (result.deletedCount === 0) {
            return { success: 'error', error_db: 'No se encontró ningún producto con el _id proporcionado' };
        }
        return { success: true };
    } catch (error) {
        return { success: 'error', error_db: 'Ocurrio un error al conectarse a MongoDB: ' + error };
    } finally {
        await client.close();
    }
};

module.exports = {
    buscarData,
    guardarData,
    actualizarData,
    eliminarData
};