const { slugify } = require('../../model/helpers/slugify');
const Book = require('../../model/Book');
const User = require('../../model/User');

module.exports.get = async (req, res) => {
    const session = req.session;
    
    try {
        
        res.status(200).render('user/wishList', { session: session, slugify: slugify, title: 'Útlagi - Ma liste d\'envie' });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.retrieve_wishlist = async (req, res) => {
    const session = req.session;
    try {
        // Send updated user wishlist
        const user = await User.findOne({ email: session.email });
        
        res.status(200).json(user.wishList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Impossible de récupérer la liste d\'envie de l\'utilisateur' });
    }
}

module.exports.delete_wishlistItems = async (req, res) => {
    const session = req.session;
    
    try {
        // Update user wishlist from react Ajax request
        // findOneAndUpdate return a promise. 'new: true' return document after updating
        const updatedUser = await User.findOneAndUpdate({ email: session.email }, { $pull: { wishList: { slug: req.params.name } } }, { new: true });
        
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
    }
}