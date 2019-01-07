const express = require("express");
const router = express.Router();
const User = require("../models/users");

// GET /login
router.get("/login", function(req, res) {
	res.render("auth/login_form");
});

// POST /login
router.post("/login", function(req, res) {
	const { email, password } = req.body;
	// check hashed password
	// set the session
	console.log(email, password);
	res.send(`${email}, ${password}`);
});

// GET /register
router.get("/register", function(req, res) {
	res.render("auth/register");
});

// POST /register
router.post("/register", function(req, res, next) {
	// create user --Complete
	// encrypt password --Complete
	// set the session & redirect to page
	const { email, first_name, last_name, password, confirm_password } = req.body;

	if (email && first_name && last_name && password && confirm_password) {
		// Verify user password
		if (password !== confirm_password) {
			const error = new Error("Password Don't match");
			error.status = 400;
			return next(error);
		}
		// Create user
		User.create({
				email,
				first_name,
				last_name,
				password
			}, function(err, user) {
				// set session and redirect to home page
				if(err) return next(err);
				req.session.userId = user._id;
				return res.redirect("/");
			});
			
	} else {
		const error = new Error("All feilds required!");
		error.status = 400;
		return next(error);
	}
});


// GET /logout
router.get("/logout", function(req, res, next) {
	// Delete session & redirect to home page
	if(req.session){
		req.session.destroy(function(err){
			if(err) return next(err);
			return res.redirect("/");
		});
	}
	
	else return res.redirect("/");
});

module.exports = router;
