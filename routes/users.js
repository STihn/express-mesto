const router = require('express').Router();
const {
  getUser, getProfile, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users.js');

router.get('/users', getUser);
router.get('/users/:id', getProfile);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
