const Answer = require("../models/answers");
const Question = require("../models/questions");

const exported = module.exports;

exported.findqIDParam = (req, res, next, id) => {
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
};

// GET /questions
exported.getQuestions = (req, res, next) => {
	// get limited number of questions
	const queryLimit = 10;
	const query = Question.find({}, null, { limit: queryLimit });
	query.exec(function(err, questions) {
		console.log("One Doc: ", questions);
		// res.json(questions);
		res.render("index.pug", { questions });
	});
};

// GET /questions/new
exported.getNewQuestionForm = (req, res) => {
	res.render("questions/new_question.pug");
};

// POST /questions
exported.createQuestion = (req, res, next) => {
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
};

// GET /questions/:qID
exported.getQuestion = (req, res, next) => {
	// if (req.question) return res.json(req.question);
	Question.findById(req.params.qID)
		.populate("answers")
		.exec(function(err, foundQuestion) {
			if (err) return next(err);
			console.log(foundQuestion);
			// foundQuestion look like {question:"...", author:{...}}
			return res.render("questions/question", {
				question: foundQuestion,
				user: req.user
			});
		});

	// return next(new Error("Not Found").status(404));
};

// DELETE /questions/:qID
exported.deleteQuestion = (req, res) => {
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
};

// Todo:
// Make a form with css and js that collaps for updating
// Make it avalible for question owner only

// PUT /questions/:qID
exported.updateQuestion = (req, res, next) => {
	// edit question whit that qID
	Question.findByIdAndUpdate(req.params.qID, req.body, function(err, question) {
		res.json(question);
	});
};

// POST /questions/:qID/vote-up only
exported.voteQuestion = (req, res, next) => {
	// votes user if hasn't already voted
	req.question.vote(req.user);
	req.question.save();
	return res.redirect(`/questions/${req.params.qID}`);
};
