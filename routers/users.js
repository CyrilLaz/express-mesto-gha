const router = require('express').Router();
const { findAllUsers } = require('../controllers/users');

router.get('/', findAllUsers);

module.exports = router;
