var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var nerdSchema = new Schema({
	name: String,
	email: String,
	nerd_level: Number
});

// Create the model for nerd and exposes it to our app
module.exports = mongoose.model('Nerd', nerdSchema);