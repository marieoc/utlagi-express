const Book = require('../model/Book');

module.exports = async (req, res) => {
    const session = req.session;
    
    try {
        const products = await Book.find().sort({ _id: -1 });
        
        res.status(200).render('../views/shop.ejs', { session, products, title: 'Útlagi - Boutique' });
    }
    
    catch (err) {
        console.log(err);
    }
};