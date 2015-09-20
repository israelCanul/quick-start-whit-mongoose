var mongoose= require('mongoose');
var express= require('express');
var app=express();
var bodyParser      = require("body-parser");

//conexion con la bd
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('conectado a la BD');
});

//convertir la app para recibir y transportar json
app.use(bodyParser.json());

//importar el modelo de mongoose
var models     = require('./model/book')(app, mongoose);
var Book = mongoose.model('Book');

//obtener todos los datos de una coleccion
app.route('/book')
    .get(function(req, res) {
      Book.find(function(err, book) {
      if(err) res.send(500, err.message);
      console.log('GET /tvshows')
      res.status(200).jsonp(book);
    });
});

  

//enroutar las peticiones
app.route('/book/:id')
  .get(function(req, res) {
      Book.findById(req.params.id, function(err, book) {
        if(err) return res.send(500, err.message);

        console.log('GET /tvshow/' + req.params.id);
        res.status(200).jsonp(book);
      });
    })
  .post(function(req, res) {

    var book = new Book({
      nombre    : req.body.nombre
      , title     : req.body.title
      , editorial : req.body.editorial
      , año       : req.body.año
    });
    
    book.save(function(err, book) {
      if(err) return res.send(500, err.message);      
      res.status(200).jsonp(book);
      console.log(req.body);
    });

    //res.jsonp(req.body);
    //console.log(req.body);
  })
  .put(function(req, res) {
    res.send('Update the book');
    console.log(req.body);
  });


// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});