const mongoose = require("mongoose");

const connectDB = async () => {
	const dbConnection = await mongoose.connect(
		process.env.MONGODB_URI,
		{
			useNewUrlParser: true,
		}
	);

	console.log(
		`MongoDB connected: ${dbConnection.connection.host}`
	);
};

module.exports = connectDB;