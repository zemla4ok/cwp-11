const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const routes = require('./routes/index');
const readFilms = require('./routes/films/readFilms');
const readFilm = require('./routes/films/read');
const createFilm = require('./routes/films/create');
const updateFilm = require('./routes/films/update');
const deleteFilm = require('./routes/films/delete');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/films/readall', readFilms);
app.use('/api/films/read', readFilm);
app.use('/api/films/create', createFilm);
app.use('/api/films/update', updateFilm);
app.use('/api/films/delete',  deleteFilm);


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 400);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});