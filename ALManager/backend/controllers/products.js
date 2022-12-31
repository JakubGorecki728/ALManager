const {validationResult} = require('express-validator');

const Product = require('../models/product');

exports.fetchAll = async (req, res, next) => {
    try {
        const [allProducts] = await Product.fetchAll();
        res.status(200).json(allProducts);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addProduct = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return;
    
    const name = req.body.name;

    try {
        const product = {
            name: name,
        };

        const result = await Product.save(product);

        res.status(201).json({message: 'Added!'})
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const deleteResponse = await Product.delete(req.params.id);
        res.status(200).json(deleteResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


