const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answersSchema = new Schema({
	answer: { type: String, trim: true },
	votes: { type: Number, default: 0 },
	// all users that vote on answer will be added to voters to limit user to 1 vote
	voters: [
		{
			type: Schema.Types.ObjectId,
			ref: "Users"
		}
	],
	// makeing type=Date will tell mongoose to formate text for you.
	date: { type: String, default: getFormatedDate },
	// each answer will have a author to check for answer ownership
	author: {
		username: String,
		id: {
			type: Schema.Types.ObjectId,
			ref: "Users"
		}
	}
});

// increamant votes on vote
answersSchema.method("vote", function(vote, callback) {
	if (vote === "up") {
		this.votes += 1;
	} else {
		this.votes -= 1;
	}
	this.save(callback);
});

// when user delete answer, remove ansewerId from question
answersSchema.method("deleteAnswerId", function(id, callback) {
	//becareful of the (this) keyword
	this.model("Questions").findById(id, (err, question) => {
		// console.log("Question:", question, "\nanswerID: ", this._id);
		question.answers.remove(this._id);
		question.save();
	});
});

function getFormatedDate() {
	const date = new Date();
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();

	return day + " " + monthNames[monthIndex] + " " + year;
}

module.exports = mongoose.model("Answers", answersSchema);
