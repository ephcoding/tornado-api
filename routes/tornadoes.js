const express = require("express");
const router = express.Router();
const { queryBuilder } = require("../middleWare/query-builder");

const TornadoModel = require("../models/Tornado");

const {
	getAllTornadoes,
	getTornadoById,
	getTornadoYearCountByState,
} = require("../controllers/tornadoes");

router.route("/").get(queryBuilder(TornadoModel), getAllTornadoes);
router.route("/:id").get(getTornadoById);
router.route("/count/:year/state").get(getTornadoYearCountByState);

module.exports = router;
