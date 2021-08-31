const db = require('../models');
const { profile: Profile } = db;

exports.getProfile = (req, res) => {
	Profile.findOne({ userId: req.params.userId }).exec((err, profile) => {
		if (err) {
			res.send({ success: false, message: err });
			return;
		}
		res.send({ success: true, message: 'success', data: profile });
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
