const express = require('express');
const router = express.Router();

let films = require('../../top250.json');

router.get('/', (req, res) => {
  films.sort((x, y) => {
    return x.position - y.position;
  })
  res.send(films);    
});

module.exports = router;