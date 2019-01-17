const express = require("express");
const Question = require("../models/questions");
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
    // res.json(question);
    res.render("index.pug", { questions });
  });
});

// POST /questions
router.post("/questions", function(req, res, next) {
  console.log(req.body);
  const question = new Question(req.body);
  question.save(function(err, questions) {
    if (err) {
      return next(err);
    }
    res.json(questions);
  });
});

// GET /questions/new
router.get("/questions/new", function(req, res) {
  res.render("questions/new_question.pug");
});

// DELETE /questions/:qID
router.delete("/questions/:qID", function(req, res) {
  // delete question whit that qID
  Question.findOneAndDelete({ _id: req.params.qID }, function(err, question) {
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

// GET /questions/:qID
router.get("/questions/:qID", function(req, res, next) {
  // if (req.question) return res.json(req.question);
  if (req.question) return res.render("questions/question");
  else return next(new Error("Not Found").status(404));
});

module.exports = router;
