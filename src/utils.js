const jwt = require('jsonwebtoken');
const APP_SECRET = 'This is my shiny little secret token';

function getUserId(context) {
	const authorization = context.request.get('Authorization');
	if (authorization) {
		const token = authorization.replace('Bearer ', '');
		const {userId} = jwt.verify(token, APP_SECRET);
		return userId;
	}
	throw new Error('Unauthorized user');
}

module.exports = {
	APP_SECRET,
	getUserId
}
