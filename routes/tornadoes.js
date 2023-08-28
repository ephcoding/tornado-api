const express = require("express");
const router = express.Router();
const { queryBuilder } = require("../middleWare/query-builder");

const TornadoModel = require("../models/Tornado");

const {
	getAllTornadoes,
	getTornadoById,
	getTornadoYearCountByMonth,
	getTornadoYearCountByState,
} = require("../controllers/tornadoes");

router.route("/").get(queryBuilder(TornadoModel), getAllTornadoes);
router.route("/:id").get(getTornadoById);
router.route("/count/state/:year").get(getTornadoYearCountByState);
router.route("/count/month/:year").get(getTornadoYearCountByMonth);

module.exports = router;
