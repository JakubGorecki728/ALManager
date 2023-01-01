const {validationResult} = require('express-validator');

const AssemblyLine = require('../models/assemblyLine');

exports.fetchAll = async (req, res, next) => {
    try {
        const [allAssemblyLines] = await AssemblyLine.fetchAll();
        res.status(200).json(allAssemblyLines);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addAssemblyLine = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return;
    
    const name = req.body.name;

    try {
        const assemblyLine = {
            name: name,
        };

        const result = await AssemblyLine.save(assemblyLine);

        res.status(201).json({message: 'Added!'})
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteAssemblyLine = async (req, res, next) => {
    try {
        const deleteResponse = await AssemblyLine.delete(req.params.id);
        res.status(200).json(deleteResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.changeStateAssemblyLine = async (req, res, next) => {
    try {
        const changeStateResponse = await AssemblyLine.changeState(req.params.id);
        res.status(200).json(changeStateResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


