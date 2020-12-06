const router = require('express').Router();
const path = require('path');
const fs = require('fs');


router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data/user.json'), (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }
    try {
      const users = JSON.parse(data);
      res.send(users);
    } catch (parseErr) {
      res.status(500).send({ message: parseErr.message });
    }
  })
})


router.get('/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data/user.json'), (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    const user = JSON.parse(data);
    const userFind = user.find((item) => item._id === req.params.id);

    if (userFind) {
      res.send(userFind);
    } else {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
  })

});

module.exports = router;