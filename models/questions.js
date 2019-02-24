const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
	question: { type: String, trim: true },
	description: { type: String, trim: true },
	// votes: { tyep: Number, default: 0 },
	votes: Number,
	// makeing type=Date will tell mongoose to formate text for you.
	createdAt: { type: String, default: getFormatedDate },
	// a question will have ref to answers
	answers: [
		{
			type: Schema.Types.ObjectId,
			ref: "Answers"
		}
	],
	// question will have a voters list
	voters: [
		{
			type: Schema.Types.ObjectId,
			ref: "Users"
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

// Todo:
// sort answers by <something>

questionsSchema.methods.vote = function(user) {
	// loop over voters id to check if user voted already
	let [id] = this.voters.filter(id => user._id.equals(id));

	// if no user in voters add user and increament
	if (!id) {
		this.voters.push(user);
		if (!this.votes) this.votes = 0;
		this.votes += 1;
	} else {
		// remove user and decreament like
		// this.voters.splice(index, elements to slice);
		let indexOfId = this.voters.indexOf(id);
		console.log(indexOfId);
		this.voters.splice(indexOfId, 1);
		this.votes -= 1;
	}
};

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
module.exports = mongoose.model("Questions", questionsSchema);
