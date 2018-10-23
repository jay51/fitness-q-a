const express = require("express");
const Question = require("../models/questions");
// const ans = require("../models/questions");
const router = express.Router();

router.get("/questions", function(req, res, next) {
	Question.find({}, function(err, questions) {
		if (err) {
			return next(err);
		}
		res.json(questions);
	});
});

router.post("/questions", function(req, res, next) {
	const question = new Question(req.body);
	question.save(function(err, questions) {
		if (err) {
			return next(err);
		}
		res.json(questions);
	});
});

router.post("/", function(req, res) {});

module.exports = router;
