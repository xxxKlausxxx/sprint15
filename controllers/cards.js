const Card = require('../models/card');
const ForbiddenError = require('../errors/forbidden_err');

const readCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const cardOwner = req.user._id;
  Card.findById(req.params.id)
    .orFail()
    .then((card) => {
      const owner = card.owner._id.toString();

      if (cardOwner !== owner) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      } else {
        Card.deleteOne(card)
          .then(() => res.send({ data: card }))
          .catch(next);
      }
    })

    .catch(next);
};

module.exports = { readCards, createCard, deleteCard };
