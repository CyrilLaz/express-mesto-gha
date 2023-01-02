const router = require('express').Router();
const { changeUserData, changeUserAvatar } = require('../controllers/me');

router.patch('/', changeUserData);

router.patch('/avatar', changeUserAvatar);

module.exports = router;
