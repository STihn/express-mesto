const User = require('../models/user');


const getUser = (req, res) => {
    User.find({})
      .then(users => res.status(200).send(users))
      .catch(err => res.status(500).send(err))
};

const getProfile = (req, res) => {
  const {id} = req.params;
  User.findById(id)
  .orFail(() => {
    const err = new Error('пользователь не найден')
    err.statusCode = 404
    throw err
  })
    .then(user => {
      if (user) {
        return res.status(200).send(user);
      } else {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch(err => res.status(500).send({ message: "ошибка сервера"}))
};

const createUser = (req,res) => {
  return User.countDocuments()
    .then(count => {
      return User.create({id: count, ...req.body})
        .then(user => res.status(200).send(user))
        .catch(err => res.status(500).send(err))
    })
};

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

module.exports = { getUser, getProfile, createUser, updateUser, updateUserAvatar };