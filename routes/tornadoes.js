const express = require("express");
const expressRouter = express.Router();
const { queryBuilder } = require("../middleWare/query-builder");

const TornadoModel = require("../models/Tornado.js");

const {
	getAllTornadoes,
	getTornadoById,
	getTornadoCountForYearByMonth,
	getTornadoCountForYearByScale,
	getTornadoCountForYearByState,
} = require("../controllers/tornadoes");

expressRouter.route("/").get(queryBuilder(TornadoModel), getAllTornadoes);
expressRouter.route("/:id").get(getTornadoById);
expressRouter.route("/count/month/:year").get(getTornadoCountForYearByMonth);
expressRouter.route("/count/scale/:year").get(getTornadoCountForYearByScale);
expressRouter.route("/count/state/:year").get(getTornadoCountForYearByState);

module.exports = expressRouter;
