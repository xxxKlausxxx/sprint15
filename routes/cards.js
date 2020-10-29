const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { readCards, createCard, deleteCard } = require('../controllers/cards');

router.post('/cards', createCard);
router.get('/cards', readCards);
router.delete('/cards/:id',//celebrate({
    // body: Joi.object().keys({
    //   id: Joi.string().hex(),
    // }),}), 
    deleteCard);

module.exports = router;
