const express = require('express');
const controller = require('../controllers/workspace');

const router = express.Router();

// CRUD => http methods
router.post('/', controller.create);

router.post('/add-to-workspace/:id/:id2', controller.addUsers);

router.get('/:page?', controller.list);

router.get('/index/:id', controller.index);

router.patch('/', controller.replace);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;
