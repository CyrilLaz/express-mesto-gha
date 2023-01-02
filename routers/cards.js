const router = require('express').Router();
const {
  findAllCards, createCard, removeCard, putLike, RemoveLike,
} = require('../controllers/cards');

router.get('/', findAllCards);

router.post('/', createCard);

router.delete('/:cardId', removeCard);

router.put('/:cardId/likes', putLike);

router.delete('/:cardId/likes', RemoveLike);

module.exports = router;
