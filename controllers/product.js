const { slugify } = require('../model/helpers/slugify');
const Book = require('../model/Book');
const User = require('../model/User');

const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
const formatedDate = (currentDate.toLocaleDateString('fr-fr', options));



module.exports.get = (req, res) => {
    const name = req.params.name;
    const session = req.session;
    
    Book.findOne({ slug: name })
        .then((product) => {
            if (!product) {
                const errorMsg = `Le produit ${name} n'a pas été trouvé !`;
                return res.status(404).render('../views/error_page.ejs', { session, errorMsg, title: 'Erreur' });
            }
            
            // create product with only required data to be stored on localStorage
            const productData = {
                title: product.title,
                slug: product.slug,
                price: product.price,
                image: product.image,
                quantity: product.quantity,
                qtyToOrder: '1'
            };
    
            // Send response to client
            res.status(200).render('../views/product.ejs', { session, productData,  product, slugify, title: 'Útlagi - ' + product.title });
        
        });
};

// GET Request to retrieve comments
module.exports.retrieve_comments = async (req, res) => {
    try {
        const session = req.session;
        const name = req.params.name;
        
        const product = await Book.findOne({ slug: name })
        
        return res.status(200).json({ session, product });
        
    }
    
    catch (err) {
        console.log(err);
    }
};

// POST Request for comment section
module.exports.add_comment = async (req, res) => {
    try {
        const name = req.params.name;
        
        // Create new ressource
        const newComment = {
            pseudo: req.session.username,
            comment: req.body.comment,
            date: formatedDate,
            email: req.session.email,
        };
        
        
        // find item in database
        const item = await Book.findOne({ slug: name });
        
        if (!item) {
            console.log('item non trouvé');
            return res.redirect('back');
        }
        
        // Push new comment in already existing book item
        item.comments.push(newComment);
        
        // save item with new comment in database
        await item.save();
        
        
        res.redirect('back');
    }
    
    catch (error) {
        console.log(error);
        res.status(500).send('erreur serveur');
    }
    
};

// DELETE Request for comment section
module.exports.delete_comments = async (req, res) => {
    const session = req.session;
    const { name, commentId } = req.params;
    
    try {
        // Update user wishlist from react Ajax request
        const updatedItem = await Book.findOneAndUpdate({ slug: name }, { $pull: {comments: { _id: commentId }} }, {new: true});
        
        console.log(updatedItem.comments);
        console.log(updatedItem);
        res.status(200).json(updatedItem);
    }
    catch (err) {
        console.log(err);
    }
}


module.exports.add_to_wishlist = async (req, res) => {
    try {
        const session = req.session;
        const productData = req.body;
        
        const user = await User.findOne({ email: session.email });
        
        // check if product is already in user's wishlist
        const isProductInWishlist = user.wishList.find(product => product.slug === productData.slug);
        if (isProductInWishlist) {
            console.log('déjà dans la wishlist !');
            return res.json('déjà dans la wishlist !');
        }
        
        // create new ressource
        const wishListItem = {
            title: productData.title,
            slug: productData.slug,
            price: productData.price,
            image: productData.image,
            quantity: productData.quantity,
            qtyToOrder: '1'
        };
        
        user.wishList.push(wishListItem);
        await user.save();
        console.log('item bien enregistré dans la wishlist !');
        
        res.json({ productData });
    }
    
    catch (err) {
        console.log(err);
    }
};



// retrieve user wishlist from db when wishlistButton is clicked
module.exports.retrieve_wishlist = async (req, res) => {
    try {
        const session = req.session;
        
        // Send updated user wishlist
        const user = await User.findOne({ email: session.email });
        // console.log('user wishlist ' + user.wishList);
        
        res.json(user.wishList);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Impossible de récupérer la liste d\'envie de l\'utilisateur' });
    }
}