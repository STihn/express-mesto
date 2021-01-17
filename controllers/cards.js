const Card = require('../models/card');


const getCards = (req, res) => {
    Card.find({}).populate('user')
      .then(cards => res.status(200).send(cards))
      .catch(err => res.status(500).send(err))
};

const createCard = (req, res) => {
  const {name, link} = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(cards => res.status(200).send(cards))
    .catch(err => res.status(500).send(err))
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then(cards => res.status(200).send(cards))
    .catch(err => res.status(500).send(err))
};

module.exports = { getCards, createCard, deleteCard };