// answers routes should fall down here!
const express = require("express");
const Answer = require("../models/answers");
// const ans = require("../models/questions");
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
	console.log("Post answer to question: ", req.params.qID);

	res.json({
		question: req.params.qID
	});
});

// router.delete("/questions/qID", function(req, res) {
// delete question whit that qID
// });

// router.put("/questions/qID", function(req, res) {
// edit question whit that qID
// });

// router.get("/questions/:qID", function(req, res, next) {
// if (req.question) return res.json(req.question);
// else return next(new Error("Not Found").status(404));
// });

module.exports = router;
