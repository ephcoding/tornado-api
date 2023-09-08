import mongoose from "mongoose";

const AnnualPropertyLossSchema = new mongoose.Schema({});

export const AnnualPropertyLoss = mongoose.model(
	"AnnualPropertyLoss",
	AnnualPropertyLossSchema
);
