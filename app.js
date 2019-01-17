"use strict";
const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
// this moudle helps us store create table for sessions inside mongo
const MongoStore = require("connect-mongo")(session);

// import routes
const questions = require("./routes/index");
const answers = require("./routes/answers");
const auths = require("./routes/auth");

const app = express();
app.use(morgan("dev"));
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json()); // for json body for postman test

// mongodb://localhost:27017/fitness // loacal Docker DB
// mongodb://localhost/fitness // cloud9
mongoose
  .connect(
    "mongodb://localhost/fitness",
    { useNewUrlParser: true }
  )
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
app.listen(port, function() {
  // if (err) console.log("Error while starting server");
  console.log("server started on Port:", port);
});
