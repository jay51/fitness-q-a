// answers routes should fall down here!
const express = require("express");
const Answer = require("../models/answers");
const Question = require("../models/questions");
const router = express.Router({ mergeParams: true });

// router.param("qID", function(req, res, next, id) {
// 	Question.findById(id, function(err, question) {
// 		if (err) return next(err);
// 		if (!question) {
// 			const error = new Error("Not Found");
// 			error.status = 404;
// 			return next(error);
// 		}
// 		req.question = question;
// 		return next();
// 	});
// });

router.post("/answers", function(req, res, next) {
	//add answer to a question
	Question.findById(req.params.qID, function(err, question) {
		Answer.create(req.body, function(err, answer) {
			question.answers.push(answer);
			answer.save();
			question.save();
		});
	});

	res.json({
		question: req.params.qID
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

module.exports = router;
