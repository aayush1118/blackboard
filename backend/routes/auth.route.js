const controller = require('../controllers/auth.controller');
const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['email', 'profile'] })
	);

	app.get('/google/callback', passport.authenticate('google'));

	app.post('/login', passport.authenticate('local'), controller.signIn);

	app.post('/signup', controller.signUp);

	app.get('/auth/failure', (req, res) => {
		res.sendStatus(401).send('something went wrong');
	});

	app.get('/logout', controller.logout);
};
