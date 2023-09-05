const Book = require('../model/Book');
const Article = require('../model/Article');
const NewsletterSub = require('../model/Newsletter');

module.exports.get = async (req, res) => {
    const session = req.session;
    
    try {
        console.log(session.role);
        
        // handle multiple promises at once so that we can render all objects
        const [products, articles] = await Promise.all([
            Book.find().sort({ _id: -1 }).limit(4),
            Article.find().sort({ _id: -1 }).limit(3)
        ]);
        
        
        
        res.status(200).render('../views/home.ejs', { session, products, articles, title: 'Útlagi - Maison d\'édition normande et nordique' });
        
    }
    catch (error) {
        console.log(error);
        res.status(500).send('erreur serveur');
    }
};

module.exports.post = (req, res) => {
    // Create new ressource
    const newsletterSub = new NewsletterSub({
        name: req.body.name,
        email: req.body.mail,
    });
    
    // Update database
    newsletterSub.save();

    res.redirect('/');
};