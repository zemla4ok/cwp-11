const express = require('express');
const router = express.Router();
let films = require('../../top250.json');

const errCreate = {code: 400, message: 'error in creating '}
const validErr = {code: 400, message: 'validating error '}

router.post('/', (req, res) => {
    console.log(req.body);
    let obj = {};
    obj.id = Date.now();
    req = req.body;
    if (!req.title || !req.rating || !req.year || !req.budget || !req.gross || !req.poster || !req.position) {
      res.json(errCreate);
      return;
    }
    let flag = true;
    obj.title = req.title;
    obj.rating = parseFloat(req.rating) < 0 ? flag = false : req.rating;
    obj.year = parseInt(req.year) < 1900 ? flag = false : req.year;
    obj.budget = parseInt(req.budget) < 0 ? flag = false : req.budget;
    obj.gross = parseInt(req.gross) < 0 ? flag = false : req.gross;
    obj.poster = req.poster;
    obj.position = parseInt(req.position) < 0 ? flag = false : req.position;
    if (!flag) {
        resp.json(validErr);
        return;
    }
    if (films[0].position > obj.position) 
      obj.position =  films[0].position -1;
    
    if (films[films.length - 1].position < obj.position) 
      obj.position = films[films.length - 1].position + 1;
    
    films = films.map((element) => {
      if(element.position >= obj.position)
        element.position++;
      return element;
    })
    films.push(obj);
    res.json(obj);
  })

module.exports = router;