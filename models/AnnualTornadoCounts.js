import mongoose from "mongoose";

const AnnualTornadoCountsSchema = new mongoose.Schema(
	{
		year: {
			type: Number,
			required: true,
			min: 1950,
			max: 2022,
		},
		count: {
			type: Number,
			required: true,
		},
		state_data: [
			{
				state_abbr: String,
				count: Number,
				monthly_data: [
					{
						month: String,
						count: Number,
						magnitude_data: [
							{
								magnitude: Number,
								count: Number,
							},
						],
					},
				],
			},
		],
	},
	{ timestamps: true }
);

export const AnnualTornadoCounts = mongoose.model(
	"AnnualTornadoCounts",
	AnnualTornadoCountsSchema
);
