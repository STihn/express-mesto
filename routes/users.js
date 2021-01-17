const router = require('express').Router();
const {getUser, getProfile, createUser} = require('../controllers/users.js');


router.get('/users', getUser);
router.get('/users/:id', getProfile);
router.post('/users', createUser);

module.exports = router;