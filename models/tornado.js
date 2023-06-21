const mongoose = require("mongoose");

const TornadoSchema = new mongoose.Schema({
	// ADDED PROPS
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
	nwsNumber: Number,
	year: { type: Number, index: true, min: 1950 },
	month: { type: Number, index: true, min: 1, max: 12 },
	day: { type: Number, min: 1, max: 31 },
	date: { type: Date },
	time: { type: String },
	timezone: {
		type: String,
		// type: mongoose.Schema.Types.Mixed,
		// validate: (val) => ["?", "9", "3"].includes(val),
	},
	stateAbbreviation: {
		type: String,
		index: true,
		trim: true,
	},
	stateName: {
		type: String,
	},
	stateFips: { type: Number },
	stateNumForYear: { type: Number },
	fScale: {
		type: Number,
		index: true,
		enum: [-9, 0, 1, 2, 3, 4, 5],
	},
	injuries: { type: Number },
	fatalities: { type: Number },
	propertyDamage: {
		type: mongoose.Schema.Types.Decimal128,
	},
	cropDamage: { type: mongoose.Schema.Types.Decimal128 },
	startLatitude: { type: mongoose.Schema.Types.Decimal128 },
	startLongitude: {
		type: mongoose.Schema.Types.Decimal128,
	},
	endLatitude: { type: mongoose.Schema.Types.Decimal128 },
	endLongitude: { type: mongoose.Schema.Types.Decimal128 },
	lengthInMiles: { type: mongoose.Schema.Types.Decimal128 },
	widthInYards: { type: Number },
	affectedStatesCount: { type: Number },
	isEntireTrackInState: { type: Boolean },
	segmentNumber: { type: Number },
	county1fips: { type: Number },
	county2fips: { type: Number },
	county3fips: { type: Number },
	county4fips: { type: Number },
	isChangedFScale: { type: Boolean },
});

module.exports = mongoose.model("Tornado", TornadoSchema);
