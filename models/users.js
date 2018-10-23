const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	first: String,
	last: String,
	email: String,
	password: String
});

module.exports = mongoose.model("Users", userSchema);
