const deleteItem = () => {
    const deleteItemBtn = document.getElementById('DeleteItemButton');
    
    // if button exists, then listen on event
    deleteItemBtn?.addEventListener('click', async () => {
        
        const itemString = document.getElementById('DeleteItemButton').getAttribute('data-product');
        const parsedItem = JSON.parse(itemString);
        
        
        const answer = window.confirm('Êtes-vous bien certain de vouloir supprimer cet item ? Ceci est une action irréversible.');
        
        // if "yes" is checked
        if (answer) {
            
            try {
                const response = await fetch(`/admin/supprimer/item/${parsedItem.slug}`, { method: 'GET' });
                const data = await response.json();
                
                if (data.success) {
                    console.log(data);
                    console.log('item supprimé');
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

export default deleteItem;