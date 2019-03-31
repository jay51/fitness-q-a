const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const date = new Date();
const dateToString = date.toDateString.bind(date);

const answersSchema = new Schema({
  answer: { type: String, trim: true },
  // all users that vote on answer will be added to voters to limit user to 1 vote
  voters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  // makeing type=Date will tell mongoose to formate text for you.
  date: { type: String, default: dateToString },
  // each answer will have a author to check for answer ownership
  author: {
    username: String,
    id: {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  }
});

// vote users
answersSchema.method("vote", function(user) {
  let [id] = this.voters.filter(id => user._id.equals(id));

  // if no user in voters, add user and increament
  if (!id) this.voters.push(user);
  else {
    let indexOfId = this.voters.indexOf(id);
    this.voters.splice(indexOfId, 1);
  }
});

// TODO
// is this why answer id is deleted when deleting an answer?

// when user delete answer, remove ansewerId from question
answersSchema.method("deleteAnswerId", function(id, callback) {
  //becareful of the (this) keyword
  this.model("Questions").findById(id, (err, question) => {
    // console.log("Question:", question, "\nanswerID: ", this._id);
    question.answers.remove(this._id);
    question.save();
  });
});

module.exports = mongoose.model("Answers", answersSchema);
