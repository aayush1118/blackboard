const db = require('../models');
const { profile: Profile, user: User } = db;

exports.getProfile = (req, res) => {
	Profile.findOne({ userId: req.params.userId }).exec((err, profile) => {
		if (err) {
			res.send({ success: false, message: err });
			return;
		}
		User.findById(req.params.userId).exec((err, user) => {
			if (err) {
				res.send({ success: false, message: err });
				return;
			}

			const { userId, activity, subjects } = profile;
			const { email, firstname, lastname } = user;

			const data = {
				userId,
				activity,
				subjects,
				email,
				firstname,
				lastname,
			};
			res.send({
				success: true,
				message: 'success',
				data,
			});
		});
	});
};

exports.updateProfile = (req, res) => {
	const newProfile = {
		roll: req.body.roll,
		degree: req.body.degree,
		year: req.body.year,
		activity: req.body.activity,
		subjects: req.body.subjects,
	};
	Profile.findOneAndUpdate(
		{ userId: req.userId },
		{ ...newProfile },
		{ new: true }
	).exec((err, profile) => {
		if (err) {
			res.send({ success: false, message: err });
			return;
		}
		res.send({
			success: true,
			message: 'updated profile',
			data: profile,
		});
	});
};
