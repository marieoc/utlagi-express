const mongoose = require('mongoose');

// Create schema
const articleSchema = mongoose.Schema({
    title: String,
    slug: String,
    content: String,
    date: String,
    image: String,
});

// Compile model from schema
const Article = mongoose.model('article', articleSchema);

module.exports = Article;