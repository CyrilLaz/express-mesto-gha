const router = require('express').Router();
const {
  findAllCards,
  createCard,
  removeCard,
  putLike,
  RemoveLike,
} = require('../controllers/cards');
const { idValidate, createCardValidate } = require('../middlewares/validate');

router.get('/', findAllCards);

router.post('/', createCardValidate, createCard);

router.delete('/:cardId', idValidate, removeCard);

router.put('/:cardId/likes', idValidate, putLike);

router.delete('/:cardId/likes', idValidate, RemoveLike);

module.exports = router;
