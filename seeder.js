const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config({
	path: "./config/config.env",
});

const TornadoModel = require("./models/tornado");

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
});

const tornadoes = JSON.parse(
	fs.readFileSync(
		`${__dirname}/data/seed_1950_2022_single_track_tornadoes.json`,
		"utf-8"
	)
);

const importTornadoes = async () => {
	try {
		await TornadoModel.insertMany(tornadoes);
		console.log(
			"Tornadoes imported to MongoDB from SPC single-track tornadoes csv"
		);
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

const deleteAllTornadoes = async () => {
	try {
		await TornadoModel.deleteMany();
		console.log(
			"All tornado documents removed from MongoDB"
		);
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

if (process.argv[2] === "-import") {
	importTornadoes();
} else if (process.argv[2] === "-delete-all") {
	deleteAllTornadoes();
}
