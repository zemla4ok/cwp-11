const express = require('express');
const router = express.Router();
let films = require('../../top250.json');

router.get('/', (req, res) => {
    res.send(films.find(film => film.id == req.query.id))
  });

module.exports = router;