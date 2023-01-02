const router = require('express').Router();
const errPath = require('../controllers/errPath');

router.patch('/', errPath);

module.exports = router;
