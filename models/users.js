const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const userSchema = new Schema({
	email: String,
	first_name: String,
	last_name: String,
	password: String
});

userSchema.pre("save", function(next) {
	// hash password and save it
	const user = this;
	const saltRounds = 10;
	bcrypt.genSalt(saltRounds, function(err, salt) {
		
    	bcrypt.hash(user.password, salt, function(err, hash) {
    		if(err) return next(err);
        	user.password = hash;
        	next();
		});

	});
	
});

module.exports = mongoose.model("Users", userSchema);
