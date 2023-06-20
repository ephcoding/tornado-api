const express = require("express");
const router = express.Router();

const {
	getAllTornadoes,
	getTornadoById,
	createTornado,
	updateTornadoById,
	deleteTornadoById,
} = require("../controllers/tornadoes");

router
	.route("/")
	.get(getAllTornadoes)
	.post(createTornado);

router
	.route("/:id")
	.get(getTornadoById)
	.put(updateTornadoById)
	.delete(deleteTornadoById);

module.exports = router;
