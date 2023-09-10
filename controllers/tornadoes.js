const Tornado = require("../models/Tornado.js");
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
exports.getTornadoCountForYearByMonth = asyncHandler(async (req, res, next) => {
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
exports.getTornadoCountForYearByScale = asyncHandler(async (req, res, next) => {
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
				_id: 1,
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
exports.getTornadoCountForYearByState = asyncHandler(async (req, res, next) => {
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
