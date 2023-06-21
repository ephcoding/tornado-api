const getJson = require("csvtojson");
const fs = require("fs");
const singleTrackTornadoesCsv =
	"./src/data/swd-single-track-tornadoes.csv";

function generateRandomIndexes(sampleSize) {
	let indexes = [];
	for (let i = 0; i < sampleSize; i++) {
		indexes = [
			...indexes,
			Math.floor(Math.random() * 65162) + 1,
		];
	}
	return indexes;
}

function createSampleDataFromSpcCsv(spcCsv, sampleSize) {
	const randomeIndexes = generateRandomIndexes(sampleSize);
	let sampleTornadoData = [];

	getJson()
		.fromFile(spcCsv)
		.then((spcCsvRows) => {
			randomeIndexes.forEach((randomIndex) => {
				sampleTornadoData = [
					...sampleTornadoData,
					spcCsvRows[randomIndex],
				];
			});

			sampleTornadoData.sort(
				(a, b) =>
					a.date.split("-").join("") -
					b.date.split("-").join("")
			);

			sampleTornadoData.forEach(
				(tornado, index) => (tornado.id = index)
			);

			fs.writeFile(
				"data/sample-tornado-data.json",
				JSON.stringify(sampleTornadoData),
				(error) => {
					if (error) throw error;
					console.log("Sample Tornado Data Generated!");
				}
			);
		});
}

createSampleDataFromSpcCsv(singleTrackTornadoesCsv, 25);
