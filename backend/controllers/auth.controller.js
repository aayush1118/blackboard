const passport = require('passport');
const db = require('../models');
const { user: User } = db;

exports.signUp = async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		source: 'local',
	});
	const currentUser = await User.findOne({ email });
	if (!currentUser) {
		User.register(newUser, req.body.password, function (err, user) {
			if (err) {
				res.sendStatus(401);
			} else {
				passport.authenticate('local')(req, res, function () {
					console.log(user);
					// res.send()
				});
			}
		});
	}
};

exports.signIn = (req, res) => {};

// exports.signInGoogle = (req, res) => {};

exports.logout = (req, res) => {
	req.logout();
	req.session.destroy();
	res.send('logged out');
};
