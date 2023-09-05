const Article = require('../../model/Article');
const { slugify } = require('../../model/helpers/slugify');

module.exports.get = async (req, res) => {
    const session = req.session;
    const name = req.params.name;
    
    try {
        const article = await Article.findOne({ slug: name});
        
        res.status(200).render('admin/handleArticle', { session: session, article: article, title: "Útlagi - Gérer l'article" });
    }
    
    catch (err) {
        console.log(err);
    }
    
};

module.exports.modify_article = async (req, res) => {
    const session = req.session;
    const name = req.params.name;
    
    try {
        // Get article
        const article = await Article.findOne({ slug: name });
        
        // get new values for article
        article.title = req.body.title;
        article.slug = slugify(article.title);
        article.content = req.body.content;
        // image = imageFile.name
        
        
        // update database
        await article.save();
        
        console.log(article.slug);
        
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
    }
};


// Delete article
module.exports.delete_article = async (req, res) => {
    const name = req.params.name;
    const session = req.session;
    
    try {
        await Article.findOneAndDelete({ slug: name });
        
        // send response to client, so client can redirect to admin page
        res.json({ success: true });
    }
    
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: 'Une erreur est survenue' });
    }
}
