const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: 'http://localhost:5000/google/callback',
		},
		function (accessToken, refreshToken, profile, cb) {
			// User.findOrCreate({ googleId: profile.id }, function (err, user) {
			// 	return cb(err, user);
			// });
			return cb(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});
