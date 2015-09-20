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

//obtener los datos de una coleccion o agregar una nueva coleccion
app.route('/book')
    .get(contBooks.findAllBooks)
    .post(contBooks.addBooks);

//Operaciones sobre un id
app.route('/book/:id')
  .get(contBooks.findById)
  .post(contBooks.putBook)
  .delete(contBooks.deleteBook);


// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});