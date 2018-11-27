const express = require("express");
const router = express.Router();

router.get("/login", function(req, res) {
	// return login form
	res.send("login Form");
});

router.post("/login", function(req, res) {
	// check hashed password
	// set the session
});

router.get("/register", function(req, res) {
	// return register form
	res.send("register form");
});

router.post("/register", function(req, res) {
	// encrypt password
	// create user
	// set the session & redirect to page
});

router.get("/logout", function(req, res) {
	// Delete session & redirect to home page
});

module.exports = router;
