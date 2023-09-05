const deleteArticle = () => {
    const deleteArticleBtn = document.getElementById('DeleteArticleButton');
    
    // if button exists, then listen on event
    deleteArticleBtn?.addEventListener('click', async () => {
        
        const articleString = document.getElementById('DeleteArticleButton').getAttribute('data-article');
        const parsedArticle = JSON.parse(articleString);
        
        
        const answer = window.confirm('Êtes-vous bien certain de vouloir supprimer cet article ? Ceci est une action irréversible.');
        
        // if "yes" is checked
        if (answer) {
            
            try {
                const response = await fetch(`/admin/supprimer/article/${parsedArticle.slug}`, { method: 'GET' });
                const data = await response.json();
                
                if (data.success) {
                    console.log(data);
                    console.log('article supprimé');
                    return window.location.replace('/admin');
                }
                console.log('error');
            }
            
            catch (err) {
                console.log(error);
            }
            
            
        } else {
            console.log('décliné');
        }
    });
    
};

export default deleteArticle;