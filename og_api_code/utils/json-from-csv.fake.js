const getJson = require("csvtojson");
const fs = require("fs");
const csvFile = "./src/data/swd-single-track-tornadoes.csv";

function generateRandomIndexes(csvFile, entries) {
	let indexes = [];
	for (let i = 0; i < entries; i++) {
		indexes = [...indexes, Math.floor(Math.random() * 65162) + 1];
	}
	return indexes;
}

function createFakeJsonFromCsv(csvFile, entries) {
	const indexes = generateRandomIndexes(csvFile, entries);
	let fakeData = [];

	getJson()
		.fromFile(csvFile)
		.then((rows) => {
			indexes.forEach((value) => {
				fakeData = [...fakeData, rows[value]];
			});

			fakeData.sort(
				(a, b) => a.date.split("-").join("") - b.date.split("-").join("")
			);

			fakeData.forEach((tornado, index) => (tornado.id = index));

			fs.writeFile(
				"src/data/fakeData.json",
				JSON.stringify(fakeData),
				(error) => {
					if (error) throw error;
					console.log("Fake Data Generated!");
				}
			);
		});
}

createFakeJsonFromCsv(csvFile, 25);
