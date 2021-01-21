const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ massage: 'Введите правильную ссылку' });
      }
      return res.status(500).send({ massage: 'ошибка не сервере' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id).populate(['owner', 'likes'])
    .orFail(() => {
      const err = new Error('Нет карточки с таким id');
      err.statusCode = 404;
      throw err;
    })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Невалидный id' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true }).populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send(err));
};

const dislikeCard = (req, res) => Card.findByIdAndUpdate(req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true }).populate(['owner', 'likes'])
  .then((card) => res.status(200).send(card))
  .catch((err) => res.status(500).send(err));

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
