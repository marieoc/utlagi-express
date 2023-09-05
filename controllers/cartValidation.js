const Book = require('../model/Book');

module.exports.get = async (req, res) => {
    const session = req.session;
    
    try {
        const products = await Book.find();
        
        res.status(200).render('../views/cart_validation.ejs', { session, products, title: 'Útlagi - Valider mon panier'});
    }
    
    catch (err) {
        console.log(err);
    }
};