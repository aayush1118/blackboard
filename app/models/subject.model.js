const mongoose = require('mongoose');

const Subject = mongoose.model(
	'Subject',
	new mongoose.Schema({
		code: { type: Number, unique: true, required: true },
		name: { type: String, trim: true, required: 'name cannot be blank' },
		students: [String],
		teacher: String,
		timings: [
			{
				start: { type: Date, default: Date.now },
				end: { type: Date, default: Date.now },
			},
		],
		assignment: [String],
	})
);

module.exports = Subject;
