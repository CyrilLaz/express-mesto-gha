const router = require('express').Router();
const { findAllUsers, findUserById } = require('../controllers/users');
const {
  idValidate,
} = require('../middlewares/validate');

router.get('/', findAllUsers);
router.get('/:userId', idValidate, findUserById);

module.exports = router;
