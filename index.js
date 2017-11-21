const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let films = require('./top250.json');
let actors = require('./actors.json');

const errCreate = {code: 400, message: 'error in creating '}
const validErr = {code: 400, message: 'validating error '}
const idErr = {code: 400, message: 'Where is id?'}
const invId = {code: 400, message: 'invalid id'}

app.get('/api/actors/readall', (req, res) => {
  actors.sort((x, y) => {
    return x.liked - y.liked;
  });
  res.send(actors);
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/films/readall', (req, res) => {
  res.send(films);    
});

app.get('/api/films/read', (req, res) => {
  res.send(films.find(film => film.id == req.query.id))
});

app.post('/api/films/create', (req, res) => {
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

app.post('/api/films/update', (req, res) => {
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
  req.title ? film.title = req.title : null;
  req.rating ? film.rating = req.rating : null;
  req.budget ? film.budget = req.budget : null;
  req.gross ? film.gross = req.gross : null;
  req.poster ? film.poster = req.poster : null;
  req.position ? film.position = req.position : null;
  req.year ? film.year = req.year : null;
  films=films.map((element) => {
    if(element.position >= film.position)
      element.position++
    return element;
  });
  res.json(film);
})

app.post('/api/films/delete', (req, res) => {
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

function sortFilms(){
  films.sort((x, y) => {
      return x.position - y.position;
  })
}

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})