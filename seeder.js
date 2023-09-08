const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config({
	path: "./config/config.env",
});

const TornadoModel = require("./models/Tornado.js");

mongoose.connect(
	// process.env.MONGODB_URI_PROD,
	process.env.MONGODB_URI_LOCAL,
	{
		useNewUrlParser: true,
	}
);

const importTornadoes = async () => {
	const tornadoes = JSON.parse(
		fs.readFileSync(`${__dirname}/data/single-track-tornadoes.json`, "utf-8")
	);

	try {
		await TornadoModel.insertMany(tornadoes);
		console.log(
			`${tornadoes.length} tornadoes imported into ${process.env.MONGODB_URI_LOCAL} using "data/single-track-tornadoes.json"`
		);
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

const deleteAllTornadoes = async () => {
	try {
		await TornadoModel.deleteMany();
		console.log("All tornado documents removed from MongoDB");
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

if (process.argv[2] === "-i") {
	importTornadoes();
} else if (process.argv[2] === "-d") {
	deleteAllTornadoes();
}
