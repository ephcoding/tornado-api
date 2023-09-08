import mongoose from "mongoose";

const Decimal = mongoose.Schema.Types.Decimal128;

const AnnualFatalitiesSchema = new mongoose.Schema({
	total_fatalities: Number,
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

export const AnnualFatalities = mongoose.model(
	"AnnualFatalities",
	AnnualFatalitiesSchema
);
