const express = require('express');
const router = express.Router();
let films = require('../../top250.json');

const invId = {code: 400, message: 'invalid id'}
const idErr = {code: 400, message: 'Where is id?'}

router.post('/', (req, res) => {
    req = req.body;
    if(!req.id){
      res.json(idErr);
      return;
    }
    let id = parseInt(req.id);
    let film = films[films.findIndex(i => i.id == id)];
    if(film === undefined){
      res.json(invId);
      return;
    }
    req.position -=1;
    req.title ? film.title = req.title : null;
    req.rating ? film.rating = req.rating : null;
    req.budget ? film.budget = req.budget : null;
    req.gross ? film.gross = req.gross : null;
    req.poster ? film.poster = req.poster : null;
    req.position ? film.position = req.position : null;
    req.year ? film.year = req.year : null;
    films=films.map((element) =>{     
      if(element.position >= film.position)
        element.position++;
        return element;
    });
    films.sort((x, y) => {
      return x.position - y.position;
    })
    let pos = 1;
    films.map((element) => {
      if(element.position !== pos)
        element.position = pos;
      pos++;
    })
    res.json(film);
  })
  
module.exports = router;