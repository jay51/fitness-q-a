const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answersSchema = new Schema({
	answer: String,
	votes: { type: Number, default: 0 },
	// all users that vote on answer will be added to voters to limit user to 1 vote
	voters: [
		{
			type: Schema.Types.ObjectId,
			ref: "Users"
		}
	],
	date: { type: Date, default: Date().now },
	// each answer will have a author to check for answer ownership
	author: {
		username: String,
		id: {
			type: Schema.Types.ObjectId,
			ref: "Users"
		}
	}
});

// Remove answer ref from answers arr in question before deleting answer
// this is document middleware
// answersSchema.pre("remove", function(next) {
// 	console.log("answer's ID: ", this._id);

// 	this.model("Questions").find({ _id: this._id });
// 	next();
// });

// this is document middleware
answersSchema.pre("remove", { query: true }, function(next) {
	console.log("answer's ID: ", this.schema);

	// this.model("Questions").find({ _id: this._id });
	next();
});

// increamant votes on vote
answersSchema.method("vote", function(vote, callback) {
	if (vote === "up") {
		this.votes += 1;
	} else {
		this.votes -= 1;
	}
	this.parent().save(callback);
});

module.exports = mongoose.model("Answers", answersSchema);
