import mongoose from "mongoose";

const Decimal = mongoose.Schema.Types.Decimal128;

const AnnualInjuriesSchema = new mongoose.Schema({
	year: Number,
	total_injuries: Number,
	by_magnitude: [
		{
			magnitude: Number,
			property_loss: Decimal,
		},
	],
	by_month: [
		{
			month: Number,
			property_loss: Decimal,
		},
	],
	by_state: [
		{
			state_abbr: String,
			property_loss: Decimal,
		},
	],
});

export const AnnualInjuries = mongoose.model(
	"AnnualInjuries",
	AnnualInjuriesSchema
);
