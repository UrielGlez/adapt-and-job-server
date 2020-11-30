const express = require('express');
const controller = require('../controllers/supportmaterials');

const router = express.Router();

// CRUD => http methods
router.post('/', controller.create);

router.get('/:space/:page?', controller.list);

router.get('/index/:id', controller.index);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;