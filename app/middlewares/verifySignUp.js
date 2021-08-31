const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
	User.findOne({
		email: req.body.email,
	}).exec((err, user) => {
		if (err) {
			res.send({ success: false, message: err });
			return;
		}

		if (user) {
			res.send({
				success: false,
				message: 'Failed! Email is already in use!',
			});
			return;
		}
		next();
	});
};

checkRolesExisted = (req, res, next) => {
	if (req.body.roles) {
		for (let i = 0; i < req.body.roles.length; i++) {
			if (!ROLES.includes(req.body.roles[i])) {
				res.send({
					success: false,
					message: `Failed! Role ${req.body.roles[i]} does not exist!`,
				});
				return;
			}
		}
	}
	next();
};

const verifySignUp = {
	checkDuplicateEmail,
	checkRolesExisted,
};

module.exports = verifySignUp;
