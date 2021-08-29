const config = require('../config/auth.config');
const db = require('../models');
const { user: User, role: Role, refreshToken: RefreshToken } = db;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	const user = new User({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password),
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	});

	user.save(async (err, user) => {
		if (err) {
			res.send({ success: false, message: err });
			return;
		}

		if (req.body.roles) {
			Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
				if (err) {
					res.send({ success: false, message: err });
					return;
				}

				user.roles = roles.map(role => role._id);
				user.save(err => {
					if (err) {
						res.send({ success: false, message: err });
						return;
					}
				});
			});
		} else {
			Role.findOne({ name: 'student' }, (err, role) => {
				if (err) {
					res.send({ success: false, message: err });
					return;
				}

				user.roles = [role._id];
				user.save(err => {
					if (err) {
						res.send({ success: false, message: err });
						return;
					}
				});
			});
		}
		//return statement
		const token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: config.jwtExpiration,
		});

		const refreshToken = await RefreshToken.createToken(user);
		const data = {
			id: user._id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			accessToken: token,
			refreshToken: refreshToken,
		};

		res.send({
			success: true,
			message: 'created account successfully',
			data,
		});
	});
};

exports.signin = (req, res) => {
	User.findOne({
		email: req.body.email,
	})
		.populate('roles', '-__v')
		.exec(async (err, user) => {
			if (err) {
				res.send({ success: false, message: err });
				return;
			}

			if (!user) {
				return res.send({
					success: false,
					message: 'something went wrong!',
				});
			}

			const passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.send({
					success: false,
					message: err,
					data: { accessToken: null },
				});
			}

			const token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: config.jwtExpiration,
			});

			const refreshToken = await RefreshToken.createToken(user);

			let authorities = [];

			for (let i = 0; i < user.roles.length; i++) {
				authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
			}
			const data = {
				id: user._id,
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				roles: authorities,
				accessToken: token,
				refreshToken: refreshToken,
			};
			res.send({ success: false, message: err, data });
		});
};

exports.refreshToken = async (req, res) => {
	const { refreshToken: requestToken } = req.body;

	if (requestToken == null) {
		return res.send({
			success: false,
			message: 'Refresh Token is required!',
		});
	}

	try {
		let refreshToken = await RefreshToken.findOne({
			token: requestToken,
		});

		if (!refreshToken) {
			return res.send({
				success: false,
				message: 'invalid refresh token!',
			});
		}

		if (RefreshToken.verifyExpiration(refreshToken)) {
			RefreshToken.findByIdAndRemove(refreshToken._id, {
				useFindAndModify: false,
			}).exec();

			res.send({
				success: false,
				message:
					'Refresh token was expired. Please make a new signIn request',
			});
			return;
		}

		let newAccessToken = jwt.sign(
			{ id: refreshToken.user._id },
			config.secret,
			{ expiresIn: config.jwtExpiration }
		);

		const data = {
			accessToken: newAccessToken,
			refreshToken: refreshToken.token,
		};

		return res.send({ success: true, message: 'success', data });
	} catch (err) {
		return res.send({ success: false, message: err });
	}
};

exports.reset = (req, res) => {
	User.findOne({
		email: req.body.email,
	})
		.populate('roles', '-__v')
		.exec(async (err, user) => {
			if (err) {
				res.send({ success: false, message: err });
				return;
			}

			if (!user) {
				res.send({ success: false, message: 'User Not found.' });
				return;
			}

			const passwordIsValid = bcrypt.compareSync(
				req.body.oldPassword,
				user.password
			);

			if (!passwordIsValid) {
				res.send({ success: false, message: 'Invalid Password!' });
				return;
			}
			const updatedUser = await User.findByIdAndUpdate(
				user._id,
				{
					password: bcrypt.hashSync(req.body.newPassword),
				},
				{ new: true }
			);

			const token = jwt.sign({ id: updatedUser.id }, config.secret, {
				expiresIn: config.jwtExpiration,
			});

			const refreshToken = await RefreshToken.createToken(updatedUser);

			const data = {
				id: updatedUser._id,
				firstname: updatedUser.firstname,
				lastname: updatedUser.lastname,
				email: updatedUser.email,
				roles: user.roles,
				accessToken: token,
				refreshToken: refreshToken,
			};
			res.send({
				success: false,
				message: 'User password changed!',
				data,
			});
		});
};
