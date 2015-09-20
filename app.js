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


//enroutar las peticiones
app.route('/book/:id')
  .get(function(req, res) {
    res.send(req.params.id);
    console.log(res);
  })
  .post(function(req, res) {
    //probado y funcionando
    res.jsonp(req.body);
    console.log(req.body);
  })
  .put(function(req, res) {
    res.send('Update the book');
    console.log(req.body);
  });


// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});