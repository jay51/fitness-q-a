function requiresLogin(req, res, next) {
	if (!req.session.userId) {
		const error = new Error("You are not Authorized to view this page.");
		error.status = 401;
		return next(error);
	}
	console.log("middleware", req.session.userId);
	return next();
}

function redirectWhenLogedin(req, res, next) {
	if (req.session && req.session.userId) return res.redirect("/");
}

function checkQuestionsOwnerShip(req, res, next) {
	// check for authentication
	const { user, question } = req;
	if (user && question) {
		if (question.author.id.equals(user._id)) return next();
		else return res.redirect("back");
	} else {
		const err = new Error("NO Allowed");
		err.status = 403;
		return next(err);
	}
}

module.exports = {
	requiresLogin,
	redirectWhenLogedin,
	checkQuestionsOwnerShip
};
