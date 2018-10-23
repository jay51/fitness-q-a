"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// import routes
const questions = require("./routes/index");

const app = express();
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json()); // for json body for postman test

mongoose.connect(
	"mongodb://localhost:27017/fitness",
	{ useNewUrlParser: true }
);

// routes
app.use("/", questions);

// error handler
app.use(function(req, res, next) {
	const error = new Error("Page Not Found");
	error.status = 404;
	next(error);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render("error", {
		message: err.message
	});
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
	// if (err) console.log("Error while starting server");
	console.log("server started on Port:", port);
});
