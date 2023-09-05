const Article = require('../model/Article');

// const articlesArray = exportedArticles.articles;
// const articles = articlesArray.reverse();

module.exports = async (req, res) => {
    const session = req.session;
    
    try {
        const articles = await Article.find().sort({ _id: -1 });
        
        res.status(200).render('../views/news.ejs', { session, articles, title: 'Útlagi - Actualités' });
    }
    
    catch (err) {
        console.log(err);
    }
};