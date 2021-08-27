const express = require('express');
const session = require('express-session');
const passport = require('passport');
//initialize env variables
require('dotenv').config();

//init express app
const app = express();
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
//configure port
const PORT = 5000;

require('./auth');

//check if user is logged in
const isLoggedIn = (req, res, next) => {
	req.user ? next() : res.sendStatus(401);
};

app.get('/', (req, res) => {
	res.send('<a href="/auth/google">Authenticate with google</a>');
});

app.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/protected',
		failureRedirect: '/auth/failure',
	})
);

app.get('/auth/failure', (req, res) => {
	res.send('something went wrong');
});

app.get('/protected', isLoggedIn, (req, res) => {
	res.send(
		`Logged in as ${req.user.displayName} <br> <a href="/logout">Logout</a>`
	);
});

app.get('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.send('logged out');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
