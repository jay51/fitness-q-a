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


// look up user and compare password
userSchema.statics.authenticate = function(email, password, callback){
	this.findOne({email})
		.exec(function(err, user){
			if(err || !user) return callback(err);
		
			bcrypt.compare(password, user.password, function(err, is_correct){
				if(err) return callback(err);
				if(is_correct) return callback(null, user);
				else{
					const error = new Error("Password is incorrect");
					error.status = 401;
					return callback(error)
				}
			});
		});
}

module.exports = mongoose.model("Users", userSchema);
