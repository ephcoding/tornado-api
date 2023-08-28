const Tornado = require("../models/Tornado");
const { asyncHandler } = require("../middleWare/async-handler");
const ErrorResponse = require("../utils/error-response");

// @desc    get all tornadoes
// @route   GET /api/v1/tornadoes
// @access  Public
exports.getAllTornadoes = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.queryResults);
});

// @desc    get single tornado by id
// @route   GET /api/v1/tornadoes/:id
// @access  Public
exports.getTornadoById = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const tornado = await Tornado.findById(id);

	if (!tornado) {
		return next(new ErrorResponse(`Tornado with id of ${id}`, 404));
	}

	res.status(200).json({ success: true, data: tornado });
});

// @desc    get tornado count by year for each month
// @route   GET /api/v1/tornadoes/count/month/:year
// @access  Public
exports.getTornadoYearCountByMonth = asyncHandler(async (req, res, next) => {
	const { year } = req.params;

	const yearCountsByMonth = await Tornado.aggregate([
		{
			$match: { year: parseInt(year) },
		},
		{
			$group: {
				_id: "$month",
				count: {
					$count: {},
				},
			},
		},
		{
			$sort: {
				count: -1,
			},
		},
	]);

	if (!yearCountsByMonth) {
		return next(
			new ErrorResponse("Error getting tornado year counts by state", 404)
		);
	}

	res.status(200).json({ success: true, data: yearCountsByMonth });
});

// @desc    get tornado count by year for each f-scale
// @route   GET /api/v1/tornadoes/count/scale/:year
// @access  Public
exports.getTornadoYearCountByScale = asyncHandler(async (req, res, next) => {
	const { year } = req.params;

	const yearCountsByScale = await Tornado.aggregate([
		{
			$match: { year: parseInt(year) },
		},
		{
			$group: {
				_id: "$scale",
				count: {
					$count: {},
				},
			},
		},
		{
			$sort: {
				count: -1,
			},
		},
	]);

	if (!yearCountsByScale) {
		return next(
			new ErrorResponse("Error getting tornado year counts by scale", 404)
		);
	}

	res.status(200).json({ success: true, data: yearCountsByScale });
});

// @desc    get tornado count by year for each state
// @route   GET /api/v1/tornadoes/count/state/:year
// @access  Public
exports.getTornadoYearCountByState = asyncHandler(async (req, res, next) => {
	const { year } = req.params;

	const yearCountsByState = await Tornado.aggregate([
		{
			$match: { year: parseInt(year) },
		},
		{
			$group: {
				_id: "$state_abbr",
				count: {
					$count: {},
				},
			},
		},
		{
			$sort: {
				count: -1,
			},
		},
	]);

	if (!yearCountsByState) {
		return next(
			new ErrorResponse("Error getting tornado year counts by state", 404)
		);
	}
	res.status(200).json({ success: true, data: yearCountsByState });
});

// @desc    Add new tornado
// @route   POST /api/v1/tornadoes/:id
// @access  Private
exports.createTornado = asyncHandler(async (req, res, next) => {
	req.body.tornado = req.tornado.id;

	const existingTornado = await Tornado.findOne({ tornado: req.tornado.id });

	if (existingTornado) {
		return next(
			new ErrorResponse(`Tornado with id of ${req.tornado.id} already exists.`)
		);
	}

	const tornado = await Tornado.create(req.body);

	res.status(200).json({ success: true, data: tornado });
});

// @desc    update tornado by id
// @route   PUT /api/v1/tornadoes/:id
// @access  Private
exports.updateTornadoById = asyncHandler(async (req, res, next) => {
	let tornado = await Tornado.findById(req.params.id);

	if (!tornado) {
		return next(
			new ErrorResponse(`Tornado with id ${req.params.id} not found.`, 404)
		);
	}

	tornado = await Tornado.findOneAndUpdate(req.params.id, req.body);

	res.status(200).json({ success: true, data: tornado });
});

// @desc    delete single tornado by id
// @route   DELETE /api/v1/tornadoes/:id
// @access  Private
exports.deleteTornadoById = asyncHandler(async (req, res, next) => {
	const tornado = await Tornado.findById(req.params.id);

	if (!tornado) {
		return next(
			new ErrorResponse(`Tornado with id ${req.params.id} not found.`, 404)
		);
	}

	tornado.remove();

	res.status(200).json({ success: true, data: {} });
});
