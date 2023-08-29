const express = require("express");
const router = express.Router();
const { queryBuilder } = require("../middleWare/query-builder");

const TornadoModel = require("../models/Tornado");

const {
  getAllTornadoes,
  getTornadoById,
  getTornadoCountForYearByMonth,
  getTornadoCountForYearByScale,
  getTornadoCountForYearByState,
} = require("../controllers/tornadoes");

router.route("/").get(queryBuilder(TornadoModel), getAllTornadoes);
router.route("/:id").get(getTornadoById);
router.route("/count/month/:year").get(getTornadoCountForYearByMonth);
router.route("/count/scale/:year").get(getTornadoCountForYearByScale);
router.route("/count/state/:year").get(getTornadoCountForYearByState);

module.exports = router;
