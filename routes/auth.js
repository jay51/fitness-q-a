const express = require("express");
const router = express.Router();

router.get("/login", function(req, res) {
	// return login form
	res.render("auth/login_form");
});

router.post("/login", function(req, res) {
	const { email, password } = req.body;
	// check hashed password
	// set the session
	console.log(email, password);
	res.send(`${email}, ${password}`);
});

router.get("/register", function(req, res) {
	// return register form
	res.render("auth/register");
});

router.post("/register", function(req, res) {
	const { email, password, confirm_password, first_name, last_name } = req.body;
	// encrypt password
	// create user
	// set the session & redirect to page
	res.send(
		`${email}, ${password}, ${confirm_password}, ${first_name}, ${last_name}`
	);
});

router.get("/logout", function(req, res) {
	// Delete session & redirect to home page
});

module.exports = router;
