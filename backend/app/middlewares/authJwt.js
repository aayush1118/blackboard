const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;
const Role = db.role;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
	if (err instanceof TokenExpiredError) {
		return res.send({
			success: false,
			message: 'Unauhtorized! Access Token was expired!',
		});
	}

	return res.send({ success: false, message: 'Unauthorized!' });
};

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];

	if (!token) {
		return res.send({
			success: false,
			message: 'No token provided!',
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return catchError(err, res);
		}
		req.userId = decoded.id;
		next();
	});
};

isProfessor = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.send({ success: false, message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.send({ success: false, message: err });

					return;
				}
				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === 'professor') {
						next();
						return;
					}
				}
				res.send({
					success: false,
					message: 'Require Professor Role!',
				});

				return;
			}
		);
	});
};

const authJwt = {
	verifyToken,
	isProfessor,
};

module.exports = authJwt;
