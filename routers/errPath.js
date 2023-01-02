const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(404).send({ message: 'Такой страницы не существует' });
});

module.exports = router;
