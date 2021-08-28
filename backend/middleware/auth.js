//check if user is logged in
isLoggedIn = (req, res, next) => {
	req.user ? next() : res.sendStatus(401);
};

const authMiddleware = {
	isLoggedIn,
};

module.exports = authMiddleware;
