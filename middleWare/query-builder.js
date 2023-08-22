// @desc handles incoming request queries & filters
exports.queryBuilder = (model) => async (req, res, next) => {
	let query;
	const reqQuery = { ...req.query };
	let queryStr = JSON.stringify(reqQuery);

	queryStr = queryStr.replace(
		/\b(gt|gte|in|lt|lte)\b/g,
		(match) => `$${match}`
	);

	query = model.find(JSON.parse(queryStr));

	// query = Tornado.find(
	// 	JSON.parse(queryStr),
	// 	"date nwsNumber stateFips county1fips fScale injuries fatalities"
	// ).sort({ date: 1 });

	const results = await query;

	res.queryResults = {
		success: true,
		count: results.length,
		data: results,
	};

	next();
};
