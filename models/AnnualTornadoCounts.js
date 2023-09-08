import mongoose from "mongoose";

const AnnualTornadoCountsSchema = new mongoose.Schema({});

export const AnnualTornadoCounts = mongoose.model(
	"AnnualTornadoCounts",
	AnnualTornadoCountsSchema
);
