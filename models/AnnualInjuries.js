import mongoose from "mongoose";

const Decimal = mongoose.Schema.Types.Decimal128;

const AnnualInjuriesSchema = new mongoose.Schema({});

export const AnnualInjuries = mongoose.model(
	"AnnualInjuries",
	AnnualInjuriesSchema
);
