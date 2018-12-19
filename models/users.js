const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: String,
	first_name: String,
	last_name: String,
	password: String
});

userSchema.pre("save", function() {
	// hash password and save it
});

module.exports = mongoose.model("Users", userSchema);
