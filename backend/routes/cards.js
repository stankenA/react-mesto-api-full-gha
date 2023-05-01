const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');
const {
  validationForCardBody,
  validationForCardParams,
} = require('../validation/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validationForCardBody, createCard);
cardsRouter.delete('/:cardId', validationForCardParams, deleteCard);
cardsRouter.put('/:cardId/likes', validationForCardParams, likeCard);
cardsRouter.delete('/:cardId/likes', validationForCardParams, unlikeCard);

module.exports = cardsRouter;
