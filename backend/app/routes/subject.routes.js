const { authJwt } = require('../middlewares');
const controller = require('../controllers/subject.controller');

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	app.get('/api/subject/join/:id', authJwt.verifyToken, controller.join);

	app.post(
		'/api/subject/create',
		[authJwt.verifyToken, authJwt.isProfessor],
		controller.create
	);

	app.post(
		'/api/subject/update/:id',
		[authJwt.verifyToken, authJwt.isProfessor],
		controller.update
	);
};
