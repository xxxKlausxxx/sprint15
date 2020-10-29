const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { readCards, createCard, deleteCard } = require('../controllers/cards');

router.post('/cards', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
    }),
  }), createCard);
router.get('/cards', readCards);
router.delete('/cards/:id', celebrate({
    body: Joi.object().keys({
      id: Joi.string().hex(),
    }),}), 
    deleteCard);

module.exports = router;
