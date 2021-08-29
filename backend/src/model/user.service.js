const addGoogleUser =
	User =>
	({ id, email, firstName, lastName }) => {
		console.log({ id, email, firstName, lastName });

		const user = new User({
			id,
			email,
			firstName,
			lastName,
			source: 'google',
		});
		return user.save();
	};

const addLocalUser =
	User =>
	({ id, email, firstName, lastName, password }) => {
		const user = new User({
			id,
			email,
			firstName,
			lastName,
			password,
			source: 'local',
		});
		return user.save();
	};

const getUsers = User => () => {
	return User.find({});
};

const getUserByEmail =
	User =>
	async ({ email }) => {
		console.log(email);
		return await User.findOne({ email });
	};

module.exports = User => {
	return {
		addGoogleUser: addGoogleUser(User),
		addLocalUser: addLocalUser(User),
		getUsers: getUsers(User),
		getUserByEmail: getUserByEmail(User),
	};
};
