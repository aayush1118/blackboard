const mongoose = require('mongoose');

const Profile = mongoose.model(
	'Profile',
	new mongoose.Schema({
		userId: String,
		roll: String,
		degree: String,
		year: { type: Number, min: 1, max: 6 },
		activity: [String],
		subjects: [String],
	})
);

module.exports = Profile;
