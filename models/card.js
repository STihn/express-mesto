const mongoose = require('mongoose');

const cardShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /^https?:\/\/.*\.(?:jpe?g|gif|png)$/gi.test(v);
        },

        massage: 'Введите правильную ссылку',
      }
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: mongoose.Types.ObjectId,
      ref: 'user',
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now()
    },
});

const cardModal = mongoose.model('card', cardShema);

module.exports = cardModal;