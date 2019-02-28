const auth = require("../middleware/auth");
const express = require("express");
const question = require("../controllers/question_controller");
const router = express.Router();

router.param("qID", question.findqIDParam);

// GET /questions
router.get("/questions", question.getQuestions);

// GET /questions/new
router.get("/questions/new", auth.requiresLogin, question.getNewQuestionForm);

// POST /questions
router.post("/questions", question.createQuestion);

// GET /questions/:qID
router.get("/questions/:qID", question.getQuestion);

// DELETE /questions/:qID
router.delete("/questions/:qID", question.deleteQuestion);

// PUT /questions/:qID
router.put("/questions/:qID", question.updateQuestion);

// POST /questions/:qID/vote-up only
router.post(
	"/questions/:qID/vote-up",
	auth.requiresLogin,
	question.voteQuestion
);

module.exports = router;
