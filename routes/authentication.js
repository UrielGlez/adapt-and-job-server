var express = require('express');
const controller = require('../controllers/authentication');

var router = express.Router();

/* GET home page. */
router.get('/', controller.landing);

router.post('/signin', controller.signin);

router.post('/signup', controller.signup);

module.exports = router;
