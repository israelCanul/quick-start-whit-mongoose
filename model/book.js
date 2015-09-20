exports = module.exports = function(app, mongoose) {

	var book = new mongoose.Schema({
	    nombre    : String
	  , title     : String
	  , editorial : String
	  , año       : Number
	});

	mongoose.model('Book',book);

};
