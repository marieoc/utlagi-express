function escapeChar(str) {
	return str
		.replace(/[']/g, "‘");
}

module.exports.escapeChar = escapeChar;