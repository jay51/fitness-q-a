function requiresLogin(req, res, next){
    if(!req.session.userId){
        const error = new Error("You are not Authorized to view this page.");
        error.status = 401;
        return next(error)
    }
    return next();
}


function redirectWhenLogedin(req, res, next){
    if(req.session && req.session.userId) return res.redirect("/");
}

module.exports = {
    requiresLogin,
    redirectWhenLogedin
}