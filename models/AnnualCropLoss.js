import mongoose from "mongoose";

const Decimal = mongoose.Schema.Types.Decimal128;

const AnnualCropLossSchema = new mongoose.Schema({
	year: Number,
	total_crop_loss: Decimal,
	by_magnitude: [
		{
			magnitude: Number,
			crop_loss: Decimal,
		},
	],
	by_month: [
		{
			month: Number,
			crop_loss: Decimal,
		},
	],
	by_state: [
		{
			state_abbr: String,
			crop_loss: Decimal,
		},
	],
});

export const AnnualCropLoss = mongoose.model(
	"AnnualCropLoss",
	AnnualCropLossSchema
);
