const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
	question: String,
	description: String,
	votes: Number,
	date: { type: Date, default: Date().now },
	author: {
		username: String,
		id: {
			type: userID,
			ref: "user collection"
		}
	}
});

module.exports = mongoose.model("Question", questionsSchema);
