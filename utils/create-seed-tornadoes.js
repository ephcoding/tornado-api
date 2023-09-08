const csv = require("csvtojson");
const fs = require("fs");

/**
 *
 * [om] assigned sequentially > 2006
 * [stn] discontinued in 08'
 * [f] changed to ef in Feb 07'
 * [loss] in millions of $ - may change
 * [sn] use to sum inj, deaths, damage, & crop loss
 * [fc] added in 16'  to account for records altered between 50'-82'
 *
 */

const createJsonFileFromCsv = async () => {
	const jsonRowsFromCsvFile = await csv().fromFile(
		"data/single_track_tornadoes.csv"
	);

	const tornadoSeedRows = jsonRowsFromCsvFile.map((tornado) => {
		return {
			nws_num: tornado.om,
			year: tornado.yr,
			month: tornado.mo,
			day: tornado.dy,
			date: tornado.date,
			time: tornado.time,
			timezone: tornado.tz,
			state_abbr: tornado.st,
			state_fips: tornado.stf,
			state_yr_num: tornado.stn,
			magnitude: tornado.mag,
			injuries: tornado.inj,
			fatalities: tornado.fat,
			property_loss: tornado.loss,
			crop_loss: tornado.closs,
			start_latitude: tornado.slat,
			start_longitude: tornado.slon,
			end_latitude: tornado.elat,
			end_longitude: tornado.elon,
			length_miles: tornado.len,
			width_yards: tornado.wid,
			impacted_states: tornado.ns,
			state_exclusive_track: tornado.sn,
			segment_num: tornado.sg,
			county_1_fips: tornado.f1,
			county_2_fips: tornado.f2,
			county_3_fips: tornado.f3,
			county_4_fips: tornado.f4,
			scale_modified: tornado.fc,
		};
	});

	writeJsonToFile(tornadoSeedRows, tornadoSeedRows.length);
};

function writeJsonToFile(jsonData, count) {
	fs.writeFile(
		"data/single-track-tornadoes.json",
		JSON.stringify(jsonData),
		(error) => {
			if (error) throw Error;
			console.log(
				`"data/single-track-tornadoes.json" created with ${count} entries.`
			);
		}
	);
}

createJsonFileFromCsv();
