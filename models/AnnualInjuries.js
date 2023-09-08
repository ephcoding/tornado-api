import mongoose from "mongoose";

const AnnualInjuriesSchema = new mongoose.Schema({});

export const AnnualInjuries = mongoose.model(
	"AnnualInjuries",
	AnnualInjuriesSchema
);
