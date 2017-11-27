const express = require('express');
const router = express.Router();
let actors = require('../../actors.json');

router.get('/', (req, res) => {
    actors.sort((x, y) => {
      return x.liked - y.liked;
    });
    res.send(actors);
  })

module.exports = router;