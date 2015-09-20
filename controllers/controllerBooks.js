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

exports.putBook= function(req,res){
	console.log('/POST to Id');
	console.log('Updating book with Id: '+req.params.id);
	Book.findById(req.params.id, function(err, book) {
      	book.nombre    = req.body.nombre;
      	book.title     = req.body.title;
      	book.editorial = req.body.editorial;
      	book.año       = req.body.año;
      	// se guarda la informacion actualizada 
      	book.save(function(err) {
      		// se atrapa el error
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(book);
		});
	});
};

exports.findById=function(req,res){
	console.log('/GET to Id');
	console.log('Get book by Id: '+req.params.id);	
      	Book.findById(req.params.id, function(err, book) {
	        if(err) return res.send(500, err.message);
	        var mens=[];
	        console.log('GET /book/' + req.params.id);
	        mens.push(book);
	        mens.push({confi:{
	          id:234,
	          nombre:"Israel Canul"
	        }});
	        res.status(200).jsonp(mens);
	    });
};


exports.deleteBook = function(req, res) {
	Book.findById(req.params.id, function(err, book) {
		console.log('/Delete book by Id');
		console.log('Delete book with Id: '+req.params.id);
		book.remove(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200);
		});
		res.send("book removed by id "+req.params.id);
	});
};
