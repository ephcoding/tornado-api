const mongoose = require("mongoose");

// -- current indexes
// year, stateAbbr, fscale
const TornadoSchema = new mongoose.Schema({
	// -- added props
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
	// -- straight from SPC SWD format spec
	nws_number: Number,
	yr: { type: Number, index: true, min: 1950 },
	mo: { type: Number, min: 1, max: 12 },
	dy: { type: Number, min: 1, max: 31 },
	date: { type: Date },
	time: { type: Date },
	tz: {
		type: mongoose.Schema.Types.Mixed,
		validate: (val) => ["?", 9, 3].includes(val),
	},
	st: { type: String, index: true, trim: true },
	stf: { type: Number },
	stn: { type: Number },
	f: { type: Number, index: true, enum: [-9, 0, 1, 2, 3, 4, 5] },
	inj: { type: Number },
	fat: { type: Number },
	loss: { type: mongoose.Schema.Types.Decimal128 },
	closs: { type: mongoose.Schema.Types.Decimal128 },
	slat: { type: mongoose.Schema.Types.Decimal128 },
	slon: { type: mongoose.Schema.Types.Decimal128 },
	elat: { type: mongoose.Schema.Types.Decimal128 },
	elon: { type: mongoose.Schema.Types.Decimal128 },
	len: { type: mongoose.Schema.Types.Decimal128 },
	wid: { type: Number },
	ns: { type: Number },
	sn: { type: Boolean },
	sg: { type: Number },
	f1: { type: Number },
	f2: { type: Number },
	f3: { type: Number },
	f4: { type: Number },
	fc: { type: Boolean },
});

module.exports = mongoose.model("Tornado", TornadoSchema);
