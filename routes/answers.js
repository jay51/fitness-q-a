const express = require("express");
const Answer = require("../models/answers");
const Question = require("../models/questions");
const router = express.Router({ mergeParams: true });

router.post("/answers", function(req, res, next) {
	//add answer to a question
	Question.findById(req.params.qID, function(err, question) {
		Answer.create(req.body, function(err, answer) {
			// push answer doc to question.answer array to save id
			question.answers.push(answer);
			answer.save();
			question.save();
			res.json({
				question,
				answer
			});
		});
	});
});

router.delete("/answers/:aID", function(req, res, next) {
	// delete answer with that aID and remove from question

	Answer.findOneAndDelete({ _id: req.params.aID }, function(err, answer) {
		// if you pass null or falsy value to next() then Express will run down the middlewar
		// if you pass Error or truthy value to next() then Express will jump to the Error handler
		if (!answer || err) {
			const error = new Error("Something went wrong!");
			error.status = 400;
			next(error);
		} else {
			answer.deleteAnswerId(req.params.qID);
			res.json({
				answer
			});
		}
	});
});

router.put("/answers/:aID", function(req, res) {
	// edit question with qID
	Answer.findByIdAndUpdate(req.params.aID, req.body, function(err, answer) {
		res.json(answer);
	});
});

router.post(
	"/answers/:aID/vote-:dir",
	function(req, res, next) {
		if (req.params.dir.search(/^(up|down)$/) === -1) {
			const err = new Error("Not Found");
			err.status = 404;
			next(err);
		}
		next();
	},
	function(req, res) {
		Answer.findById(req.params.aID, function(err, answer) {
			answer.vote(req.params.dir, function() {
				console.log(req.params.dir);
			});
		});

		res.json({
			vote: req.params.dir
		});
	}
);

module.exports = router;
