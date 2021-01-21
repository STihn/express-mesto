const User = require('../models/user');

const getUser = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

const getProfile = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const err = new Error('Нет пользователя с таким id');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Невалидный id' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
    });
};

const createUser = (req, res) => User.countDocuments()
  .then((count) => User.create({ id: count, ...req.body })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ massage: err.errors.avatar.properties.massageError });
      }
      return res.status(500).send({ massage: 'ошибка не сервере' });
    }));

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    upsert: false,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    upsert: false,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getUser, getProfile, createUser, updateUser, updateUserAvatar,
};
