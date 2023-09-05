const Book = require('../../model/Book');
const { slugify } = require('../../model/helpers/slugify');


module.exports.get = async (req, res) => {
    const session = req.session;
    const name = req.params.name;
    
    try {
        const product = await Book.findOne({ slug: name });
    
        res.render('admin/handleItem', { session, product, title: "Útlagi - Gérer l'item" });
    }
    
    catch (err) {
        console.log(err);
    }
    
};

module.exports.modify_item = async (req, res) => {
    console.log('object modified');
    const name = req.params.name;
    
    try {
        // get item data
        const product = await Book.findOne({ slug: name });
        
        // Get image file
        // const imageFile = req.files.imageFile;
        
        // Move image to 'public' folder
        /**
        imageFile.mv('./public/img/products/' + imageFile.name, (error) => {
            if (error) {
                console.log(error);
            }
        });
        */
        
        // delete old ones ???
        
        // get new values from inputs
        product.title = req.body.title;
        product.slug = slugify(product.title);
        product.authors = req.body.authors;
        product.price = req.body.price;
        // product.image = imageFile.name,
        product.description = req.body.description;
        product.synopsis = req.body.synopsis;
        product.ugc = req.body.ugc;
        product.category = req.body.category;
        product.weight = req.body.weight;
        product.quantity = req.body.qty;
        product.qtyToOrder = req.body.qtyToOrder;
        product.size = req.body.size;
        product.isbn = req.body.isbn;
        product.pages = req.body.pages;
        product.format = req.body.format;
        product.illustrations = req.body.illustrations;
        product.languages = req.body.languages;
        product.releaseDate = req.body.releaseDate;
        
        
        // update database
        await product.save();
        
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
    }
};


// Delete item
module.exports.delete_item = async (req, res) => {
    const name = req.params.name;
    const session = req.session;
    
    try {
        await Book.findOneAndDelete({ slug: name });
        
        // send response to client, so client can redirect to admin page
        res.json({ success: true });
    }
    
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: 'Une erreur est survenue' });
    }
};