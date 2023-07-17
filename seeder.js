const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config({
	path: "./config/config.env",
});
const { FILE_PATHS } = require("./constants/file-paths");

const TornadoModel = require("./models/tornado");

mongoose.connect(
	process.env.MONGODB_URI,
	// process.env.MONGODB_LOCAL_URI,
	{
		useNewUrlParser: true,
	}
);

const tornadoes = JSON.parse(
	fs.readFileSync(
		`${__dirname}${FILE_PATHS.single_track_tornadoes_json}`,
		"utf-8"
	)
);

const importTornadoes = async () => {
	try {
		await TornadoModel.insertMany(tornadoes);
		console.log(
			`Tornadoes imported into ${process.env.MONGODB_URI} from ${FILE_PATHS.single_track_tornadoes_json}`
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
	importTornadoes();
} else if (process.argv[2] === "-delete-all") {
	deleteAllTornadoes();
}
