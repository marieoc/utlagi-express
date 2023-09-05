const Article = require('../model/Article');

module.exports = (req, res) => {
    const session = req.session;
    const name = req.params.name;
    
    Article.findOne({ slug: name })
        .then((article) => {
            if (!article) {
                const errorMsg = `L'article ${name} n'a pas été trouvé !`;
                res.status(404).render('../views/error_page.ejs', { session, errorMsg, title: 'Erreur' });
            }
            
            res.status(200).render('../views/article.ejs', { session, article, title: 'Útlagi - ' + article.title });
            
        });
};