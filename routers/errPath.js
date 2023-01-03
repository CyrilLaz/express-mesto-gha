const router = require('express').Router();
const errPath = require('../controllers/errPath');

router.all('/', errPath);

module.exports = router;
