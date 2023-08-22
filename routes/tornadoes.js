const express = require("express");
const router = express.Router();
const { queryBuilder } = require("../middleWare/query-builder");

const TornadoModel = require("../models/Tornado");

const {
	getAllTornadoes,
	getTornadoById,
	createTornado,
	updateTornadoById,
	deleteTornadoById,
} = require("../controllers/tornadoes");

router.route("/").get(queryBuilder(TornadoModel), getAllTornadoes);

router.route("/:id").get(getTornadoById);

module.exports = router;
