const router = require('express').Router();
const { changeUserData, getUserData } = require('../controllers/me');
const {
  changeUserDataValidate, changeUserAvatarValidate,
} = require('../middlewares/validate');

router.patch('/', changeUserDataValidate, changeUserData);
router.get('/', getUserData);
router.patch('/avatar', changeUserAvatarValidate, changeUserData);

module.exports = router;
