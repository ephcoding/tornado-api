// @desc    get all tornadoes
// @route   GET /api/v1/tornadoes
// @access  Public
exports.getAllTornadoes = (req, res, next) => {
	res.status(200).json({ responseOK: true, data: "return all tornadoes" });
};

// @desc    get single tornado by id
// @route   GET /api/v1/tornadoes/:id
// @access  Public
exports.getTornadoById = (req, res, next) => {
	res
		.status(200)
		.json({ responseOK: true, data: `get tornado with id: ${req.params.id}` });
};

// @desc    Add new tornado
// @route   POST /api/v1/tornadoes/:id
// @access  Private
exports.createTornado = (req, res, next) => {
	res.status(200).json({
		responseOK: true,
		data: `add new tornado with id: ${req.params.id}`,
	});
};

// @desc    update tornado by id
// @route   PUT /api/v1/tornadoes/:id
// @access  Private
exports.updateTornadoById = (req, res, next) => {
	res.status(200).json({
		responseOK: true,
		data: `update tornado with id: ${req.params.id}`,
	});
};

// @desc    delete single tornado by id
// @route   DELETE /api/v1/tornadoes/:id
// @access  Private
exports.deleteTornadoById = (req, res, next) => {
	res.status(200).json({
		responseOK: true,
		data: `delete tornado with id: ${req.params.id}`,
	});
};
