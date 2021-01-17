const User = require('../models/user');


const getUser = (req, res) => {
    User.find({})
      .then(users => res.status(200).send(users))
      .catch(err => res.status(500).send(err))
};

const getProfile = (req, res) => {
  const {userId} = req.params;
  User.findById(userId)
    .then(user => {
      if (user) {
        return res.status(200).send(user);
      } else {
        return res.status(500).send({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch(err => res.status(500).send(err))
};

const createUser = (req,res) => {
  return User.countDocuments()
    .then(count => {
      return User.create({id: count, ...req.body})
        .then(user => res.status(200).send(user))
        .catch(err => res.status(500).send(err))
    })
}

module.exports = {getUser, getProfile, createUser};