import mongoose from "mongoose";

const AnnualTornadoCountsSchema = new mongoose.Schema(
	{
		year: Number,
		total_tornadoes: Number,
		by_magnitude: [
			{
				magnitude: Number,
				count: Number,
			},
		],
		by_month: [
			{
				magnitude: Number,
				count: Number,
			},
		],
		by_state: [
			{
				state_abbr: String,
				count: Number,
			},
		],
	},
	{ timestamps: true }
);

export const AnnualTornadoCounts = mongoose.model(
	"AnnualTornadoCounts",
	AnnualTornadoCountsSchema
);
