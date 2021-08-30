const mongoose = require('mongoose');

const Subject = mongoose.model(
	'Subject',
	new mongoose.Schema({
		name: String,
		students: [String],
		teacher: String,
		timings: [{ type: Date, default: Date.now }],
		assignment: [String],
	})
);

module.exports = Subject;
