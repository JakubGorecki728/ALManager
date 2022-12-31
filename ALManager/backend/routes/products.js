const express = require('express');

const { body } = require('express-validator');

const productsController = require('../controllers/products');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, productsController.fetchAll);

router.post(
    '/',
    [
        auth,
        body('name').trim().not().isEmpty(),
    ], productsController.addProduct
);

router.delete(
    '/:id', auth, productsController.deleteProduct);

module.exports = router;