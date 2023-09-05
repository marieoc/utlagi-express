const handleFormButtons = () => {
    // Add item + Add article forms
    const addArticleButton = document.getElementById('addArticleButton');
    const addArticleForm = document.querySelector('.article-form');
    
    const addItemButton = document.getElementById('addItemButton');
    const addItemForm = document.querySelector('.item-form');
    
    if (addArticleButton) {
        addArticleButton.addEventListener('click', () => {
        addArticleForm.submit();
        });
    }
    
    if (addItemButton) {
        addItemButton.addEventListener('click', () => {
        addItemForm.submit();
        });
    }
};

export default handleFormButtons;