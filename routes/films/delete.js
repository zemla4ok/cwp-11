const express = require('express');
const router = express.Router();
let films = require('../../top250.json');

const invId = {code: 400, message: 'invalid id'}
const idErr = {code: 400, message: 'Where is id?'}

router.post('/', (req, res) => {
    let request = req.body;
    if(!request.id){
      res.json(idErr);
      return;
    }
    let id = parseInt(request.id);
    let filmIndex = films.findIndex(i => i.id === id);
    console.log(filmIndex);
    if(filmIndex < 0){
      res.json(invId);
      return;
    }
    let delPosition = films[filmIndex].position;
    films.splice(filmIndex, 1);
    films.map((element) => {
      if(element.position > delPosition)
        element.position--;
      return element;
    })
    res.json(films);
  })

module.exports = router;