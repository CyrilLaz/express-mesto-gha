const router = require('express').Router();
const { changeUserData, changeUserAvatar, getUserData } = require('../controllers/me');

router.patch('/', changeUserData);
router.get('/', getUserData);
router.patch('/avatar', changeUserAvatar);

module.exports = router;
