var mongoose= require('mongoose');
var Book = mongoose.model('Book');

//GET - Funcion para regresar todos los books de la coleccion
//GET - This function return all books on the colection
exports.findAllBooks = function(req, res) {
    Book.find(function(err, book) {
      if(err) res.send(500, err.message);
      console.log('GET /tvshows')
      res.status(200).jsonp(book);
	});
};

//GET - Funcion para agregar un nuevo libro a la coleccion a traves de la 
//		url : localhost:3000/books
//GET - This function added a new book on the colection 
// 		across the url localhost:3000/books
exports.addBooks = function(req, res) {
	console.log('/POST');
	console.log('Agregando un nuevo libro:');
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
};