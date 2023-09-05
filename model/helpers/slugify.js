function slugify(str) {
	return str
		.toLowerCase()
		.trim()
		.replace(/['.,"]/g, "")
		.replace(/[:;?!]/g, "")
		.replace(/[\s_-]+/g, "")
		.replace(/[éèê]/g, "e")
		.replace(/[ùüú]/g, "u")
		.replace(/^-+|-+$/g, "");
};

module.exports.slugify = slugify;