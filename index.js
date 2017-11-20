const express = require('express');
const app = express();

let films = require('./top250.json');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/films/readall', (req, res) => {
  res.send(films);    
});

app.get('/api/films/read', (req, res) => {

});

function sortFilms(){
  films.sort((x, y) => {
      return x.position - y.position;
  })
}

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})