const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//initialize env variables
require('dotenv').config();

//init express app
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//use cookies
app.use(cookieParser());

//mongoose setup
const db = require('./models');
const db_URI = process.env.db_URI || 'mongodb://localhost:27017/blackboard';
//connenct to db
db.mongoose
	.connect(db_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		console.log('Successfully connect to MongoDB.');
	})
	.catch(err => {
		console.error('Connection error', err);
		process.exit();
	});

//auth init
app.use(session({ secret: process.env.SESSION_SECRET, resave: false }));
app.use(passport.initialize());
app.use(passport.session());
//configure port
const PORT = 5000;

require('./helper/auth');

app.get('/', (req, res) => {
	res.send('<a href="/auth/google">Authenticate with google</a>');
});

require('./routes/auth.route')(app);

// app.get('/protected', isLoggedIn, (req, res) => {
// 	res.send(
// 		`Logged in as ${req.user.displayName} <br> <a href="/logout">Logout</a>`
// 	);
// });

app.listen(PORT, () => console.log(`listening on ${PORT}`));
