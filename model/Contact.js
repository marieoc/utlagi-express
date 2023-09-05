const mongoose = require('mongoose');

// Create schema
const contactFormSchema = mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    cookieConsent: Boolean,
});

// Compile model from schema
const Contact = mongoose.model('contact', contactFormSchema);

module.exports = Contact;