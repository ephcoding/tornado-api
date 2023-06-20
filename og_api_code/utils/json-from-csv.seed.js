const getJson = require("csvtojson");
const fs = require("fs");
const csvFile = "./src/data/swd-single-track-tornadoes.csv";
const destFilePath = "src/db/single-track-tornadoes-seed.json";

function createSeedData(csvFile, destinationFilePath) {
	getJson()
		.fromFile(csvFile)
		.then(async (rows) => {
			fs.writeFile(destinationFilePath, JSON.stringify(rows), (error) => {
				if (error) throw Error;
				console.log("JSON Tornadoes Created!");
			});
		});
}

function convertCsvRowToObj(row) {
	const docObj = {
		nwsNumber: row.om,
		stateNumForYear: row.stn,
		chronology: {
			year: row.yr,
			month: row.mo,
			day: row.dy,
			date: row.date,
			time: row.time,
			timezone: row.tz,
		},
		impact: {
			statesImpacted: row.ns,
			injuries: row.inj,
			fatalities: row.fat,
			propertyDamage: row.loss,
			cropDamage: row.closs,
		},
		track: {
			isSingleStateTrack: !row.sn ? "false" : "true",
			segmentNumber: row.sg,
			startLatitude: row.slat,
			startLongitude: row.slon,
			endLatitude: row.elat,
			endLongitude: row.elon,
		},
		cyclone: {
			fScale: row.mag,
			isChangedFScale: !row.fc ? "false" : "true",
			length: row.len,
			width: row.wid,
		},
		geo: {
			stateAbbreviation: row.st,
			// st_name: row.,
			fips: {
				state: row.stf,
				county1: row.f1,
				county2: row.f2,
				county3: row.f3,
				county4: row.f4,
			},
		},
	};

	return docObj;
}
function writeJsonToFile(destFilePath, jsonData) {
	fs.writeFile(destFilePath, JSON.stringify(jsonData), (error) => {
		if (error) throw Error;
		console.log("JSON Tornadoes Created!");
	});
}

createSeedData(csvFile, destFilePath);
