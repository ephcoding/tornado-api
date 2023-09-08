import mongoose from "mongoose";

const Decimal = mongoose.Schema.Types.Decimal128;

const AnnualFatalitiesSchema = new mongoose.Schema({});

export const AnnualFatalities = mongoose.model(
	"AnnualFatalities",
	AnnualFatalitiesSchema
);
