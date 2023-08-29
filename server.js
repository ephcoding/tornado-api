const morgan = require("morgan");
const xss = require("xss-clean");
const express = require("express");
const httpParamPollution = require("hpp");
const helmetSecurityHeaders = require("helmet");
const sanitize = require("express-mongo-sanitize");
const expressRateLimit = require("express-rate-limit");
require("dotenv").config({
	path: "./config/config.env",
});

const { errorHandler } = require("./middleWare/error-handler");

const connectDB = require("./config/database");
connectDB();

const expressApp = express();
expressApp.use(xss());
expressApp.use(sanitize());
expressApp.use(express.json());
expressApp.use(expressRateLimit());
expressApp.use(httpParamPollution());
expressApp.use(helmetSecurityHeaders());

const tornadoesRouter = require("./routes/tornadoes");

if ((process.env.NODE_ENV = "development")) {
	expressApp.use(morgan("dev"));
}

const PORT = process.env.PORT || 5001;
expressApp.use("/v1/tornadoes", tornadoesRouter);

expressApp.listen(
	PORT,
	console.log(
		`Server up in ${process.env.NODE_ENV} mode running on port ${PORT}`
	)
);
expressApp.use(errorHandler);

process.on("unhandledRejection", (error, promise) => {
	console.log(`>> ERROR >>\n`, error.message);
});
