const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URI_LOCAL;
let dbClient = new MongoClient(url);

const connectDB = async () => {
	try {
		const connection = await dbClient.connect();
		console.log(
			`connected to local MongoDB database: ${connection.db().databaseName}`
		);
	} catch (error) {
		console.log(">> ERROR >>\n", error);
	}
};

module.exports = { dbClient, connectDB };
