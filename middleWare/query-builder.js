// @desc handles incoming request queries & filters
exports.queryBuilder = (model) => async (req, res, next) => {
	let query;

	let queryStr = JSON.stringify({ ...req.query });

	queryStr = queryStr.replace(
		/\b(gt|gte|in|lt|lte)\b/g,
		(match) => `$${match}`
	);

	query = model.find(JSON.parse(queryStr));

	const results = await query;

	res.queryResults = {
		success: true,
		count: results.length,
		data: results,
	};

	next();
};
