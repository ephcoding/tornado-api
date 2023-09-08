const mongoose = require("mongoose");

const connectDB = async () => {
	const dbConnection = await mongoose.connect(
		// process.env.MONGODB_URI_PROD,
		process.env.MONGODB_URI_LOCAL,
		{ useNewUrlParser: true }
	);

	console.log(`MongoDB connected at ${dbConnection.connection.host}`);
};

module.exports = connectDB;
