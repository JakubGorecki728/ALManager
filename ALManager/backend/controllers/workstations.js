const {validationResult} = require('express-validator');

const Workstation = require('../models/workstation');

exports.fetchAll = async (req, res, next) => {
    try {
        const [allWorkstations] = await Workstation.fetchAll();
        res.status(200).json(allWorkstations);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addWorkstation = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return;
    
    const short_name = req.body.short_name;
    const name = req.body.name;
    const pc_name = req.body.pc_name;

    try {
        const workstation = {
            short_name: short_name,
            name: name,
            pc_name: pc_name,
        };

        const result = await Workstation.save(workstation);

        res.status(201).json({message: 'Added!'})
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteWorkstation = async (req, res, next) => {
    try {
        const deleteResponse = await Workstation.delete(req.params.id);
        res.status(200).json(deleteResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


