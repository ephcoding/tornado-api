import mongoose from "mongoose";

const AnnualFatalitiesSchema = new mongoose.Schema({});

export const AnnualFatalities = mongoose.model(
	"AnnualFatalities",
	AnnualFatalitiesSchema
);
