require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./app/config/db.config');

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
const Role = db.role;

const db_URI =
	process.env.MONGODB_URI ||
	`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

db.mongoose
	.connect(db_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Successfully connect to MongoDB.');
		initial();
	})
	.catch(err => {
		console.error('Connection error', err);
		process.exit();
	});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/profile.routes')(app);
require('./app/routes/subject.routes')(app);

//serve react app
//serve static assets
if (process.env.NODE_ENV === 'production') {
	console.log('active');
	//set static folder
	app.use(express.static('../frontend/build'));
	app.get('/', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, 'frontend', 'build', 'index.html')
		);
	});
}

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

function initial() {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: 'student',
			}).save(err => {
				if (err) {
					console.log('error', err);
				}
				console.log("added 'student' to roles collection");
			});

			new Role({
				name: 'professor',
			}).save(err => {
				if (err) {
					console.log('error', err);
				}

				console.log("added 'professor' to roles collection");
			});
		}
	});
}
