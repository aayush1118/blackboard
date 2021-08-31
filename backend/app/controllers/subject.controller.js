const db = require('../models');
const { profile: Profile, subject: Subject } = db;

exports.join = (req, res) => {
	Subject.findOne({ code: req.params.id }).exec((err, subject) => {
		if (err) {
			res.send({ success: false, message: err });
			return;
		}
		Profile.findOne({ userId: req.userId }).exec((err, profile) => {
			if (err) {
				res.send({ success: false, message: err });
				return;
			}
			Profile.findOneAndUpdate(
				{ userId: req.userId },
				{ subjects: [...profile.subjects, subject._id] },
				{ new: true }
			).exec(err => {
				if (err) {
					res.send({ success: false, message: err });
					return;
				}
				Subject.findByIdAndUpdate(subject._id, {
					students: [...subject.students, req.userId],
				}).exec(err => {
					if (err) {
						res.send({ success: false, message: err });
						return;
					}
					res.send({
						success: true,
						message: 'joined subject',
						data: subject,
					});
				});
			});
		});
	});
};

exports.create = (req, res) => {
	const num = Math.floor(Math.random() * 10 ** 6);
	console.log(num);

	const subject = new Subject({
		code: num,
		name: req.body.name,
		teacher: req.userId,
		timings: req.body.timings,
		assignment: req.body.assignment,
	});
	subject.save((err, subject) => {
		if (err) {
			res.send({ success: false, message: 'something went wrong!' });
			return;
		}
		res.send({
			success: true,
			message: 'created subject successfully',
			data: subject,
		});
	});
};

exports.update = (req, res) => {
	const subject = {
		name: req.body.name,
		timings: req.body.timings,
		assignment: req.body.assignment,
	};
	Subject.findOneAndUpdate({ code: req.params.id }, subject, {
		new: true,
	}).exec((err, subject) => {
		if (err) {
			res.send({ success: false, message: err });
			return;
		}
		res.send({
			success: true,
			message: 'updated subject successfully',
			data: subject,
		});
	});
};

exports.getSubjects = (req, res) => {
	Subject.find()
		.$where(`this.students.includes(${req.params.id})`)
		.exec((err, subjects) => {
			if (err) {
				res.send({ success: false, message: err });
				return;
			}
			res.send({
				success: true,
				message: 'subjects retrieved!',
				data: subjects,
			});
		});
};

exports.getSubjects = (req, res) => {
	Profile.findOne({ userId: req.params.id }).exec(async (err, profile) => {
		if (err) {
			res.send({ success: false, message: err });
			return;
		}
		//result variable
		var result = [];
		for (let i = 0; i < profile.subjects.length; i++) {
			const subjectId = profile.subjects[i];

			await Subject.findById(subjectId)
				.then(subject => {
					result.push(subject);
				})
				.catch(err => {
					res.send({ success: false, message: err });
				});
		}
		res.send({
			success: true,
			message: 'subjects retrieved!',
			data: result,
		});
	});
};
