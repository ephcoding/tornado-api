const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config({
	path: "./config/config.env",
});

const TornadoModel = require("./models/Tornado");

mongoose.connect(
	// process.env.MONGODB_URI_PROD,
	process.env.MONGODB_URI_LOCAL,
	{
		useNewUrlParser: true,
	}
);

const tornadoes = JSON.parse(
	fs.readFileSync(`${__dirname}/data/single_track_tornadoes.json`, "utf-8")
);

const importTornadoes = async (objArr) => {
	try {
		await TornadoModel.insertMany(objArr);
		console.log(
			`${objArr.length} tornadoes imported into ${process.env.MONGODB_LOCAL_URI} using "data/single_track_tornadoes.json"`
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

if (process.argv[2] === "-import") {
	importTornadoes(tornadoes);
} else if (process.argv[2] === "-delete-all") {
	deleteAllTornadoes();
}
