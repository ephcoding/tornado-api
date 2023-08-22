require("dotenv").config({
	path: "./config/config.env",
});
const express = require("express");
const morgan = require("morgan");
const { errorHandler } = require("./middleWare/error-handler");
const connectDB = require("./config/database");

connectDB();

const tornadoesRouter = require("./routes/tornadoes");

const app = express();
app.use(express.json());

if ((process.env.NODE_ENV = "development")) {
	app.use(morgan("dev"));
}

// TODO: add security & CORS here -- X

const PORT = process.env.PORT || 5001;
app.use("/v1/tornadoes", tornadoesRouter);

app.listen(
	PORT,
	console.log(
		`Server up in ${process.env.NODE_ENV} mode running on port ${PORT}`
	)
);

app.use(errorHandler);

process.on("unhandledRejection", (error, promise) => {
	console.log(`>> ERROR >>\n`, error.message);
});
