const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { readUsers, readUserById } = require('../controllers/users');


router.get('/users/:id', celebrate({
    body: Joi.object().keys({
      id: Joi.string().hex(),
    }),
  }), readUserById);
router.get('/users', readUsers);

module.exports = router;
