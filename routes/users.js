const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

// CRUD => http methods

router.get('/:page?', controller.list);

router.get('/index/:id', controller.index);

router.patch('/', controller.replace);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;
