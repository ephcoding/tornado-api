import mongoose from "mongoose";

const AnnualCropLossSchema = new mongoose.Schema({});

export const AnnualCropLoss = mongoose.model(
	"AnnualCropLoss",
	AnnualCropLossSchema
);
