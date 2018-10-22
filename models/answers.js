const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answersSchema = new Schema({
	answer: String,
	date: { type: Date, default: Date().now },
	author: {
		username: String,
		id: {
			type: userID,
			ref: "user collection"
		}
	}
});

module.exports = mongoose.model("Answer", answersSchema);
