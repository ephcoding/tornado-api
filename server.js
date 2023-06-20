require("dotenv").config({
	path: "./config/config.env",
});
const express = require("express");
const morgan = require("morgan");

const tornadoesRouter = require("./routes/tornadoes");

const app = express();
const PORT = process.env.PORT || 5001;

if (
	(process.env.NODE_ENV = "development")
) {
	app.use(morgan("dev"));
}

app.use(
	"/api/v1/tornadoes",
	tornadoesRouter
);

app.listen(
	PORT,
	console.log(
		`Server up in ${process.env.NODE_ENV} mode running on port ${PORT}`
	)
);
