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

//importar el modelo de mongoose y el controlador
var models     = require('./model/book')(app, mongoose);
var contBooks= require('./controllers/controllerBooks');
var Book = mongoose.model('Book');

//obtener todos los datos de una coleccion
app.route('/book')
    .get(contBooks.findAllBooks)
    .post(contBooks.addBooks);

  

//enroutar las peticiones
app.route('/book/:id')
  .get(function(req, res) {
      Book.findById(req.params.id, function(err, book) {
        if(err) return res.send(500, err.message);
        var mens=[];
        console.log('GET /tvshow/' + req.params.id);
        mens.push(book);
        mens.push({confi:{
          id:234,
          nombre:"Israel Canul"
        }});
        res.status(200).jsonp(mens);
      	
      });
    })
  .post(contBooks.putBook)
  .put(function(req, res) {
    res.send('Update the book');
    console.log(req.body);
  });


// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});