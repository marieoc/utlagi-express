const mongoose = require('mongoose');

// Create schema --- 1st type: Books
const bookSchema = mongoose.Schema({
        title: String,
        slug: String,
        authors: String,
        price: String,
        image: String,
        description: String,
        synopsis: String,
        ugc: String,
        category: String,
        weight: String,
        quantity: String,
        qtyToOrder: String,
        size: String,
        isbn: String,
        pages: String,
        format: String,
        illustrations: String,
        languages: String,
        releaseDate: String,
        background: String,
        comments: [
            {
                pseudo: String,
                comment: String,
                date: String,
                email: String,
            }
        ]
});

// Compile model from schema
const Book = mongoose.model('book', bookSchema);

// module.exports = Comment;
module.exports = Book;

// Other schema for other product type to be created later







