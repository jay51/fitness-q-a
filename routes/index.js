const Answer = require("../models/answers");
const express = require("express");
const Question = require("../models/questions");
const auth = require("../middleware/auth");
const router = express.Router();

router.param("qID", function(req, res, next, id) {
	Question.findById(id, function(err, question) {
		if (err) return next(err);
		if (!question) {
			const error = new Error("Not Found");
			error.status = 404;
			return next(error);
		}
		req.question = question;
		return next();
	});
});

// GET /questions
router.get("/questions", function(req, res, next) {
	// get limited number of questions
	const queryLimit = 10;
	const query = Question.find({}, null, { limit: queryLimit });
	query.exec(function(err, questions) {
		console.log("One Doc: ", questions);
		// res.json(questions);
		res.render("index.pug", { questions });
	});
});

// GET /questions/new
router.get("/questions/new", auth.requiresLogin, function(req, res) {
	res.render("questions/new_question.pug");
});

// POST /questions
router.post("/questions", function(req, res, next) {
	console.log(req.body);
	// const questionData = { ...req.body };
	Question.create(req.body, function(err, question) {
		if (err) return next(err);
		// save user info to question
		question.author.id = req.user._id;
		question.author.username = req.user.first_name;
		question.save();
		res.json(question);
	});
});

// GET /questions/:qID
router.get("/questions/:qID", function(req, res, next) {
	// if (req.question) return res.json(req.question);
	Question.findById(req.params.qID)
		.populate("answers")
		.exec(function(err, foundQuestion) {
			if (err) return next(err);
			console.log(foundQuestion);
			// foundQuestion look like {question:"...", author:{...}}
			return res.render("questions/question", foundQuestion);
		});

	// return next(new Error("Not Found").status(404));
});

// DELETE /questions/:qID
router.delete("/questions/:qID", function(req, res) {
	// delete question with that qID
	Question.findOneAndDelete({ _id: req.params.qID }, function(err, question) {
		// delete the answers
		const answersId = question.answers;
		answersId.forEach(id => {
			Answer.findByIdAndDelete(id, function() {
				console.log("deleted");
			});
		});

		res.json({
			question
		});
	});
});

// PUT /questions/:qID
router.put("/questions/:qID", function(req, res) {
	// edit question whit that qID
	Question.findByIdAndUpdate(req.params.qID, req.body, function(err, question) {
		res.json(question);
	});
});

// POST /questions/:qID/vote-up only
router.post("/questions/:qID/vote-up", auth.requiresLogin, function(
	req,
	res,
	next
) {
	// votes user if hasn't already voted
	req.question.vote(req.user);
	req.question.save();
	return res.redirect(`/questions/${req.params.qID}`);
});

module.exports = router;
