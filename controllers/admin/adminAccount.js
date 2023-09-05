const User = require('../../model/User');
const Book = require('../../model/Book');
const Article = require('../../model/Article');
const Contact = require('../../model/Contact');
const bcrypt = require('bcrypt');
const { slugify } = require('../../model/helpers/slugify');


const currentDate = new Date();
const formatedDate = (currentDate.toLocaleDateString('fr-fr'));

module.exports.get = async (req, res) => {
    const session = req.session;
    
    try {
        const [admin, products, articles, contacts] = await Promise.all([
            User.findOne({ email: session.email }),
            Book.find().sort({ _id: -1 }),
            Article.find().sort({ _id: -1 }),
            Contact.find().sort({ _id: -1 }),
        ]);
        
        const itemsOutOfStock = await Book.find({ quantity: 0 });
        
        
        
        res.status(200).render('admin/admin_account', { admin, session, products, itemsOutOfStock, articles, errorsArray: '', validationMsg: '', contacts, title: 'Útlagi - Administrateur' });
    }
    catch (err) {
        console.log(err);
    }
};


module.exports.handle_data = async (req, res) => {
    console.log('informations modifiées');
    const session = req.session;
    
    try {
        const user = await User.findOne({ email: session.email });
        
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.email = req.body.email;
        user.phoneNumber = req.body.tel;
        
        await user.save();
        
        
        res.redirect('/admin');    
    }
    catch (err) {
        console.log(err);
    }
};

module.exports.handle_password = async (req, res) => {
    const session = req.session;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const errorsArray = [];
    const validationMsg = [];
    
    try {
        const [admin, products, articles, contacts, itemsOutOfStock] = await Promise.all([
            User.findOne({ email: session.email }),
            Book.find().sort({ _id: -1 }),
            Article.find().sort({ _id: -1 }),
            Contact.find().sort({ _id: -1 }),
            Book.find({ quantity: 0 })
        ]);
    
        // If errors
        if (!currentPassword || !newPassword || !confirmPassword) {
            errorsArray.push({ message: 'Veuillez remplir tous les champs' });
        }
        
        if (newPassword !== confirmPassword) {
            errorsArray.push({ isNotSame: 'Les nouveaux mots de passe ne sont pas identiques'});
        }
        
        if (newPassword.length < 3 || confirmPassword.length < 3) {
            errorsArray.push({ lengths: 'Les nouveaux mots de passe sont trop courts'});
        }
        
        // If validation, then encrypt
        bcrypt.compare(currentPassword, admin.password, (err, isSamePassword) => {
            if (err) {
                console.log(err);
            }
            // If match but errors in other fields
            if (errorsArray.length > 0) {
                console.log('password matching but failed other fields');
                
                 return res.render('admin/admin_account', { session, products, articles, itemsOutOfStock, contacts, errorsArray, validationMsg: '', admin, title: 'Útlagi - Administrateur' });
            
            // If not match and error in other fields     
            } else if (!isSamePassword || errorsArray.length > 0) {
                errorsArray.push({ msg: 'Le mot de passe actuel n\'est pas le bon' });
                return res.render('admin/admin_account', { session, products, articles, itemsOutOfStock, contacts, errorsArray, validationMsg: '', admin, title: 'Útlagi - Administrateur' });
            }
            
            // If match, then hash new password
            console.log('password matching !');
            validationMsg.push({ pwd: 'Le mot de passe a bien été modifié'});
            admin.password = newPassword;
            
            admin.save();
            
             res.render('admin/admin_account', { session, products, articles, itemsOutOfStock, contacts, errorsArray, validationMsg, admin, title: 'Útlagi - Administrateur' });
        });
    }
    catch (err) {
        console.log(err);
    }
};



module.exports.item = (req, res) => {
    console.log('item created');
    
    // Get image file
    const imageFile = req.files.imageFile; // access by req.files + name of input type="file"
    
    // Move image to 'public' folder
    imageFile.mv('./public/img/products/' + imageFile.name, (error) => {
        if (error) {
            console.log(error);
        }
    });
    
    
    // Create document
    const book = new Book({
        title: req.body.title,
        slug: slugify(req.body.title),
        authors: req.body.authors,
        price: req.body.price,
        image: imageFile.name,
        description: req.body.description,
        synopsis: req.body.synopsis,
        ugc: req.body.ugc,
        category: req.body.category,
        weight: req.body.weight,
        quantity: req.body.qty,
        qtyToOrder: '1',
        stock: parseInt(req.body.qty) > 0 ? 'En stock' : 'En rupture de stock',
        size: req.body.size,
        isbn: req.body.isbn,
        pages: req.body.pages,
        format: req.body.format,
        illustrations: req.body.illustrations,
        languages: req.body.languages,
        releaseDate: req.body.releaseDate,
        background: false,
    });
    
    
    // Update database
    book.save();
    
    res.redirect('/admin');
};


module.exports.article = (req, res) => {
    // Get image file
    const imageFile = req.files.imageFile;
    
    // Move image to 'public' folder
    imageFile.mv('./public/img/articles/' + imageFile.name, (error) => {
        if (error) {
            console.error(error);
        }
    });
    
    // Create new ressource
    const article = new Article({
        title: req.body.title,
        slug: slugify(req.body.title),
        content: req.body.content,
        date: formatedDate,
        image: imageFile.name,
    });
    
    
    // Update database
    article.save();
    
    res.redirect('/admin');
};