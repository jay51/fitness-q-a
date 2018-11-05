const mongoose = require("mongoose");
const Questions = require("./questions");

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
// answersSchema.pre("findOneAndDelete", { query: true }, function(next) {
// console.log("pre was called, ID: ", this._id);

// this.model("Questions").find({_id: })
// Questions.findById(this._id, function(err, questionn) {
// 	console.log("questionn: ", questionn);
// });

// next();
// });

// increamant votes on vote
answersSchema.method("vote", function(vote, callback) {
	if (vote === "up") {
		this.votes += 1;
	} else {
		this.votes -= 1;
	}
	this.parent().save(callback);
});

answersSchema.method("deleteAnswerId", function(id, callback) {
	//becareful of the (this) keyword
	this.model("Questions").findById(id, (err, question) => {
		// console.log("Question:", question, "\nanswerID: ", this._id);
		question.answers.remove(this._id);
		question.save();
	});
});

module.exports = mongoose.model("Answers", answersSchema);
