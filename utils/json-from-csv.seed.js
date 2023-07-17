const csv = require("csvtojson");
const fs = require("fs");
const { STATES } = require("../constants/states-map");
const { FILE_PATHS } = require("../constants/file-paths");

const createJsonFileFromCsv = async (csvPath, destPath) => {
	const jsonRowsFromCsvFile = await csv().fromFile(csvPath);

	const tornadoSeedRows = jsonRowsFromCsvFile.map((tornado) => {
		return {
			nwsNumber: tornado.om, // after 2006, assign sequentially
			year: tornado.yr,
			month: tornado.mo,
			day: tornado.dy,
			date: tornado.date,
			time: tornado.time,
			timezone: tornado.tz,
			stateAbbreviation: tornado.st,
			// stateName: STATES[tornado.st], // ** ADDED PROPERTY **
			stateFips: tornado.stf,
			stateNumForYear: tornado.stn, // discontinued in 2008
			fScale: tornado.mag || tornado.f, // went to EF scale in February 2007
			injuries: tornado.inj,
			fatalities: tornado.fat,
			propertyDamage: tornado.loss, // currently in millions but may change
			cropDamage: tornado.closs,
			startLatitude: tornado.slat,
			startLongitude: tornado.slon,
			endLatitude: tornado.elat,
			endLongitude: tornado.elon,
			lengthInMiles: tornado.len,
			widthInYards: tornado.wid,
			affectedStatesCount: tornado.ns,
			isEntireTrackInState: tornado.sn, // use when summing injuries, fatalities, property damage, & crop damage
			segmentNumber: tornado.sg,
			county1fips: tornado.f1,
			county2fips: tornado.f2,
			county3fips: tornado.f3,
			county4fips: tornado.f4,
			isChangedFScale: tornado.fc, // added in 2016  to account for records altered between 1950-1982
		};
	});

	writeJsonToFile(destPath, tornadoSeedRows);
};

function writeJsonToFile(destPath, jsonData) {
	fs.writeFileSync(destPath, JSON.stringify(jsonData), (error) => {
		if (error) throw Error;
		console.log("Single-Track Tornado JSON File Created!!");
	});
}

createJsonFileFromCsv(
	FILE_PATHS.spc_single_track_tornadoes_csv,
	FILE_PATHS.single_track_tornadoes_json
);
