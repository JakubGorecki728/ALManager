const express = require('express');

const { body } = require('express-validator');

const workstationsController = require('../controllers/workstations');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, workstationsController.fetchAll);

router.post(
    '/',
    [
        auth,
        body('short_name').trim().not().isEmpty(),
        body('name').trim().not().isEmpty(),
        body('pc_name').trim().not().isEmpty(),
    ], workstationsController.addWorkstation
);

router.delete(
    '/:id', auth, workstationsController.deleteWorkstation);

module.exports = router;