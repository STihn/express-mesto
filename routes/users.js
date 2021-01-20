const router = require('express').Router();
const {getUser, getProfile, createUser, updateUser, updateUserAvatar } = require('../controllers/users.js');


router.get('/users', getUser);
router.get('/users/:id', getProfile);
router.post('/users', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;