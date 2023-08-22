const csv = require("csvtojson");
const fs = require("fs");

function generateRandomIndexes(sampleSize) {
	let indexes = [];
	for (let i = 0; i < sampleSize; i++) {
		indexes = [...indexes, Math.floor(Math.random() * 65162) + 1];
	}
	return indexes;
}

const createSampleDataFromCsv = async (count) => {
	const randomeIndexes = generateRandomIndexes(count);
	const jsonRowsFromCsvFile = await csv().fromFile(
		"data/single_track_tornadoes.csv"
	);

	const sampleTornadoData = randomeIndexes.map((index) => {
		return {
			nws_num: jsonRowsFromCsvFile[index].om,
			year: jsonRowsFromCsvFile[index].yr,
			month: jsonRowsFromCsvFile[index].mo,
			day: jsonRowsFromCsvFile[index].dy,
			date: jsonRowsFromCsvFile[index].date,
			time: jsonRowsFromCsvFile[index].time,
			timezone: jsonRowsFromCsvFile[index].tz,
			state_abbr: jsonRowsFromCsvFile[index].st,
			state_fips: jsonRowsFromCsvFile[index].stf,
			state_yr_num: jsonRowsFromCsvFile[index].stn,
			scale: jsonRowsFromCsvFile[index].f,
			injuries: jsonRowsFromCsvFile[index].inj,
			deaths: jsonRowsFromCsvFile[index].fat,
			damage: jsonRowsFromCsvFile[index].loss,
			crop_loss: jsonRowsFromCsvFile[index].closs,
			start_lat: jsonRowsFromCsvFile[index].slat,
			start_lon: jsonRowsFromCsvFile[index].slon,
			end_lat: jsonRowsFromCsvFile[index].elat,
			end_lon: jsonRowsFromCsvFile[index].elon,
			length_miles: jsonRowsFromCsvFile[index].len,
			width_yards: jsonRowsFromCsvFile[index].wid,
			impacted_states: jsonRowsFromCsvFile[index].ns,
			state_exclusive_track: jsonRowsFromCsvFile[index].sn,
			segment_num: jsonRowsFromCsvFile[index].sg,
			county_1_fips: jsonRowsFromCsvFile[index].f1,
			county_2_fips: jsonRowsFromCsvFile[index].f2,
			county_3_fips: jsonRowsFromCsvFile[index].f3,
			county_4_fips: jsonRowsFromCsvFile[index].f4,
			scale_modified: jsonRowsFromCsvFile[index].fc,
		};
	});

	fs.writeFile(
		"data/single_track_tornadoes.json",
		JSON.stringify(sampleTornadoData),
		(error) => {
			if (error) throw error;
			console.log(`${count} fake documents generated.`);
		}
	);
};

// createSampleDataFromCsv("./data/single_track_tornadoes.csv", 25);
createSampleDataFromCsv(25);
