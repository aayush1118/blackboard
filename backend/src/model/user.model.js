const mongoose = require('mongoose');

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		id: {
			type: String,
			default: null,
		},
		email: {
			type: String,
			required: [true, 'email required'],
			unique: [true, 'email already registered'],
		},
		firstName: String,
		lastName: String,
		password: String,
		source: { type: String, required: [true, 'source not specified'] },
	})
);

module.exports = User;
