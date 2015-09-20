exports = module.exports = function(app, mongoose) {

	var Schema = mongoose.Schema
	  , ObjectId = Schema.ObjectId;

	var book = new Schema({
	    nombre    : ObjectId
	  , title     : String
	  , editorial : String
	  , año       : Number
	});

	mongoose.model('Book',book);

};
