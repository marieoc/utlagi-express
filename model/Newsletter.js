const mongoose = require('mongoose');

// Create schema
const newsletterSchema = mongoose.Schema({
    name: String,
    email: String,
});

// Compile model from Schema
const NewsletterSub = mongoose.model('newsletterSub', newsletterSchema);

module.exports = NewsletterSub;