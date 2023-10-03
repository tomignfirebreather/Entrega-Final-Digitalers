const path = require('path');

const {
    buscarData,
    guardarData,
    actualizarData,
    eliminarData
} = require('../models/productsModels');

const insertarProductos = async (req, res) => {
    var productname = req.body.productName;
    var productdescription = req.body.productDescription;
    var productprice = req.body.productPrice;
    var productstock = req.body.productStock;
    var data = {
        productname,
    };
    let resultado = await buscarData(data);
    if (resultado.success == 'nodata') {
        data = {
            productname,
            productdescription,
            productprice,
            productstock
        };
        resultado = await guardarData(data);
        if(resultado.success) {
            res.status(300).json({
                message: 'Producto insertado correctamente en la base de datos',
                data: resultado.producto
            });
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
            message: 'El producto ya existe en la base de datos'
        });
    }
};
const buscarProductos = async (req, res) => {
    var productID = req.body.productSearch;
    var productname = req.body.productSearch;
    var data = {
        productID,
        productname
    };
    let resultado = await buscarData(data);
    if (resultado.success == 'sidata') {
        res.status(300).json({
            message: 'Se han encontrado productos',
            data: resultado.producto
        });
    } else if(resultado.error_db !== undefined) {
        res.status(400).send({
            message: resultado.error_db
        });
    } else {
        res.status(500).send({
            message: 'No se han encontrado coincidencias'
        });
    }
};
const actualizarProductos = async (req, res) => {
    var productID = req.body.productID;
    var productname = req.body.productName;
    var productdescription = req.body.productDescription;
    var productprice = req.body.productPrice;
    var productstock = req.body.productStock;
    var data = {
        productID,
    };
    let resultado = await buscarData(data);
    if (resultado.success == 'sidata') {
        data = {
            productID,
            productname,
            productdescription,
            productprice,
            productstock
        };
        resultado = await actualizarData(data);
        if(resultado.success) {
            res.status(300).json({
                message: 'Producto actualizado correctamente',
                data: resultado.producto
            });
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
            message: 'No se encontró el producto que quiere actualizar'
        });
    }
};
const eliminarProductos = async (req, res) => {
    var productID = req.body.productID;
    var data = {
        productID,
    };
    let resultado = await buscarData(data);
    if (resultado.success == 'sidata') {
        resultado = await eliminarData(data);
        if(resultado.success) {
            res.status(300).send({
                message: 'Producto eliminado correctamente',
            });
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
            message: 'No se encontró ningún producto con el _id proporcionado'
        });
    }
};

module.exports = {
    insertarProductos,
    buscarProductos,
    actualizarProductos,
    eliminarProductos
};