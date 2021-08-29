require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserService = require('./src/model');
const User = require('./src/model/user.model');

require('./src/config/passport');
require('./src/config/local');
require('./src/config/google');

const mongodbUri =
	process.env.MONGO_URI || 'mongodb://localhost:27017/blackboard';

mongoose.connect(
	mongodbUri,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	error => {
		if (error) console.log(error);
	}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
	session({
		secret: process.env.CLIENT_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
	req.user ? next() : res.sendStatus(401);
};

app.get('/', (req, res) => {
	res.send('<a href="/auth/google">auth using google</a><hr>');
});

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);

app.get(
	'/auth/google/callback',
	passport.authenticate('google'),
	(req, res) => {
		res.send(req.user);
	}
);

app.get('/auth/logout', (req, res) => {
	req.session.destroy(function () {
		res.clearCookie('connect.sid');
		res.sendStatus(200);
	});
});

app.post('/auth/local/signup', async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	console.log(req.body);

	if (password.length < 8) {
		res.sendStatus(401).send({ message: 'password too short' });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await UserService.addLocalUser({
			id: uuid.v4(),
			email,
			firstName,
			lastName,
			password: hashedPassword,
		});
	} catch (e) {
		res.sendStatus(401);
	}

	res.send({ message: 'user added succesfully' });
});

app.post('/auth/local/signin', passport.authenticate('local'), (req, res) => {
	res.send(req.user);
});

var port = process.env.PORT || 5000;

app.listen(port, function () {
	console.log(`listening on port ${port}`);
});
