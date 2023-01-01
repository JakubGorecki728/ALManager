const express = require('express');

const { body } = require('express-validator');

const assemblyLinesController = require('../controllers/assemblyLines');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, assemblyLinesController.fetchAll);

router.post(
    '/',
    [
        auth,
        body('name').trim().not().isEmpty(),
    ], assemblyLinesController.addAssemblyLine
);

router.delete(
    '/:id', auth, assemblyLinesController.deleteAssemblyLine);

module.exports = router;