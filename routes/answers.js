const express = require("express");
const Answer = require("../models/answers");
const Question = require("../models/questions");
const auth = require("../middleware/auth");
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

//Note:
// No need for GET because it's renderd on /question/qID

router.post("/answers", function(req, res, next) {
  //add answer to a question
  Question.findById(req.params.qID, function(err, question) {
    const newAnswer = new Answer(req.body);
    // push answer doc to question.answer array to save id
    question.answers.push(newAnswer);
    // save user to answer
    newAnswer.author.username = req.user.first_name;
    newAnswer.author.id = req.user._id;
    newAnswer.save();
    question.save();

    res.json({
      question,
      newAnswer
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
