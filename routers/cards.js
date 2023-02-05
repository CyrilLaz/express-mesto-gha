const router = require('express').Router();
const {
  findEighteenLastCards,
  // findAllCards,
  createCard,
  removeCard,
  putLike,
  removeLike,
} = require('../controllers/cards');
const { idValidate, createCardValidate } = require('../middlewares/validate');

router.get('/', findEighteenLastCards);

router.post('/', createCardValidate, createCard);

router.delete('/:cardId', idValidate, removeCard);

router.put('/:cardId/likes', idValidate, putLike);

router.delete('/:cardId/likes', idValidate, removeLike);

module.exports = router;
