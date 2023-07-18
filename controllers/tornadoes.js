const Tornado = require("../models/tornado");

// @desc    get all tornadoes
// @route   GET /api/v1/tornadoes
// @access  Public
exports.getAllTornadoes = async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify({ ...req.query });

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Tornado.find(
    JSON.parse(queryStr),
    "date nwsNumber stateFips county1fips fScale injuries fatalities"
  ).sort({ date: 1 });

  try {
    const tornadoes = await query;
    if (tornadoes) {
      res.status(200).json({
        success: true,
        count: tornadoes.length,
        query: req.query,
        data: tornadoes,
      });
    }
  } catch (error) {
    res.status(400).json({ status: 400 });
  }
};

// @desc    get single tornado by id
// @route   GET /api/v1/tornadoes/:id
// @access  Public
exports.getTornadoById = async (req, res, next) => {
  try {
    const tornado = await Tornado.findById(req.params.id);

    if (!tornado) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: tornado });
  } catch (error) {
    res.status(400).json({ status: 400 });
  }
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
