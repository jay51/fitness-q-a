const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
	question: String,
	description: String,
	// votes: { tyep: Number, default: 0 },
	votes: Number,
	createdAt: { type: Date, default: new Date().toLocaleString() },
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

questionsSchema.methods.vote = function(user) {
	// loop over voters id to check if user voted already
	let [id] = this.voters.filter(id => user._id.equals(id));

	if (!id) {
		this.voters.push(user);
		if (!this.votes) this.votes = 0;
		this.votes += 1;
	}
	// Todo:
	// if user in voters don't upvote else vote
	// Else if user in voters and clickd like
	// take him out of voters and decreament votes
};

// Todo:
// sort answers by <something>

module.exports = mongoose.model("Questions", questionsSchema);
