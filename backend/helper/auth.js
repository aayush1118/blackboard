const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const { user: User } = db;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: 'http://localhost:5000/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			//get relevant from profile
			const id = profile.id;
			const email = profile.emails[0].value;
			// const profilePhoto = profile.photos[0].value;
			//check if user already exists in our db with the given profile ID
			const currentUser = await User.findOne({ email });

			if (!currentUser) {
				const newUser = await addGoogleUser({
					id,
					email,
					// profilePhoto,
				});
				return done(null, newUser);
			}

			if (currentUser.source != 'google') {
				//return error
				return done(null, false, {
					message: `You have previously signed up with a different signin method`,
				});
			}
		}
	)
);

passport.use(
	new LocalStrategy(function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	})
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

//const addGoogleUser = ({ id, email, firstName, lastName, profilePhoto }) => {
const addGoogleUser = ({ id, email }) => {
	const user = new User({
		id,
		email,
		source: 'google',
	});
	return user.save();
};
