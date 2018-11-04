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

router.delete("/answers/:aID", function(req, res) {
	// delete answer whit that aID
	// this will delete the answer but questions will still have the id for a deleted question

	// extract this to a static or doc method
	Answer.findOneAndDelete({ _id: req.params.aID }, function(err, answer) {
		console.log("answer to remove", answer);

		Question.findById(req.params.qID, function(err, question) {
			console.log("question: ", question);
			question.answers.remove(req.params.aID);
			console.log("question: ", question);
			question.save();
		});

		res.json({
			answer
		});
	});
});

// router.put("/questions/qID", function(req, res) {
// edit question whit that qID
// });

// router.get("/questions/:qID", function(req, res, next) {
// if (req.question) return res.json(req.question);
// else return next(new Error("Not Found").status(404));
// });

module.exports = router;
