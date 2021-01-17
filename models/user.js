const mongoose = require('mongoose');

const userShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /^(https?:\/\/)[w{3}.]*[\w-\.\/\&]+(#)?$/.test(v);
        },
        massage: 'Введите правильную ссылку',
      }
    }
});

const userModal = mongoose.model('user', userShema);

module.exports = userModal;