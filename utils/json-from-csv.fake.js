const csv = require("csvtojson");
const fs = require("fs");

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

const createSampleDataFromSpcCsv = async (
	spcCsv,
	sampleSize
) => {
	const randomeIndexes = generateRandomIndexes(sampleSize);
	const jsonRowsFromCsvFile = await csv().fromFile(spcCsv);

	const sampleTornadoData = randomeIndexes.map((index) => {
		return Object.assign(jsonRowsFromCsvFile[index], {
			id: index,
		});
	});

	fs.writeFile(
		"data/sample-tornado-data.json",
		JSON.stringify(sampleTornadoData),
		(error) => {
			if (error) throw error;
			console.log("Sample Tornado Data Generated!");
		}
	);
};

createSampleDataFromSpcCsv(
	"./data/spc_1950_2022_single_track_tornadoes.csv",
	25
);
