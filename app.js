"use strict";
const User = require("./models/users");
const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
// this moudle helps us store create table for sessions inside mongo
const MongoStore = require("connect-mongo")(session);

// import routes
const questions = require("./routes/index");
const answers = require("./routes/answers");
const auths = require("./routes/auth");

const app = express();
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());//for json body & postman test

// mongodb://localhost:27017/fitness // loacal Docker DB
// mongodb://localhost/fitness // cloud9
mongoose
	.connect("mongodb://localhost/fitness", { useNewUrlParser: true })
	.then(console.log("DB Connected"));
const db = mongoose.connection;

// set up the session
app.use(
	session({
		secret: "the only required argument",
		resave: true, // force the session to be saved in the session store
		saveUninitialized: false, // (to save or not to save) an uninitialized/new session in the store
		// To store sessions in db
		store: new MongoStore({
			mongooseConnection: db
		})
	})
);

// store user in req
app.use(function(req, res, next) {
	const id = req.session.userId;
	if (!id) return next();
	User.findById(id, function(err, founduser) {
		if (err) return next(err);
		req.user = founduser;
		res.locals.currentUser = founduser.first_name;
		return next();
	});
});

// routes
// you would need to put the more spsific routes or middelwares at the top
app.use("/questions/:qID", answers);
app.use("/", questions);
app.use("/", auths);

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

if (!(process.env.NODE_ENV === "test")) {
	app.listen(port, function(err) {
		if (err) console.log("Error while starting server");
		console.log("server started on Port:", port);
	});
}

if (process.env.NODE_ENV === "test") {
	// if env = test then use mock DB
	// mongoose.connection.close(function() {
	// 	console.log("Mongoose connection disconnected");
	// });
}

// Export server instance for Testing
module.exports = app;
