const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

//auth models
db.user = require('./auth/user.model');
db.role = require('./auth/role.model');
db.refreshToken = require('./auth/refreshToken.model');
//profile
db.profile = require('./profile.model');
//subject
db.subject = require('./subject.model');

db.ROLES = ['student', 'professor'];

module.exports = db;
