const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
	question: String,
	description: String,
	votes: { tyep: Number, default: 0 },
	createdAt: { type: Date, default: new Date().toDateString() },
	// a question will have ref to answers
	answers: [
		{
			type: Schema.Types.ObjectId,
			ref: "Answers"
		}
	],
	// a question will have author to check for ownership
	author: {
		username: String,
		id: {
			type: Schema.Types.ObjectId,
			ref: "Users"
		}
	}
});

// sort answers| later

module.exports = mongoose.model("Questions", questionsSchema);
