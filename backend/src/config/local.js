const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserService = require('../model');
const bcrypt = require('bcrypt');

passport.use(
	new LocalStrategy(async function (email, password, done) {
		console.log({ email, password });
		const currentUser = await UserService.getUserByEmail({ email });
		console.log(currentUser);

		if (!currentUser) {
			return done(null, false, {
				message: `User with email ${email} does not exist`,
			});
		}

		if (currentUser.source != 'local') {
			return done(null, false, {
				message: `You have previously signed up with a different signin method`,
			});
		}

		if (!bcrypt.compareSync(password, currentUser.password)) {
			return done(null, false, {
				message: `Incorrect password provided`,
			});
		}
		return done(null, currentUser);
	})
);
