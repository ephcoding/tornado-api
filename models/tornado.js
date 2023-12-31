const mongoose = require("mongoose");

const TornadoSchema = new mongoose.Schema({
	// ADDED PROPS
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
	nws_num: { type: Number },
	year: { type: Number, index: true, min: 1950 },
	month: { type: Number, index: true, min: 1, max: 12 },
	day: { type: Number, min: 1, max: 31 },
	date: { type: Date },
	time: { type: String },
	timezone: {
		type: String,
	},
	state_abbr: {
		type: String,
		index: true,
		trim: true,
	},
	state_fips: { type: Number },
	state_yr_num: { type: Number },
	scale: {
		type: Number,
		index: true,
	},
	injuries: { type: Number },
	deaths: { type: Number },
	damage: {
		type: mongoose.Schema.Types.Decimal128,
	},
	crop_loss: { type: mongoose.Schema.Types.Decimal128 },
	start_lat: { type: mongoose.Schema.Types.Decimal128 },
	start_lon: {
		type: mongoose.Schema.Types.Decimal128,
	},
	end_lat: { type: mongoose.Schema.Types.Decimal128 },
	end_lon: { type: mongoose.Schema.Types.Decimal128 },
	length_miles: { type: mongoose.Schema.Types.Decimal128 },
	width_yards: { type: Number },
	impacted_states: { type: Number },
	state_exclusive_track: { type: Boolean },
	segment_num: { type: Number },
	county_1_fips: { type: Number },
	county_2_fips: { type: Number },
	county_3_fips: { type: Number },
	county_4_fips: { type: Number },
	scale_modified: { type: Boolean },
});

module.exports = mongoose.model("Tornado", TornadoSchema);
