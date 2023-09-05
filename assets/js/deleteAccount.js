const deleteAccount = () => {
    const deleteAccountBtn = document.querySelector('.delete-account-btn');
    
    // if button exists, listen on event
    deleteAccountBtn?.addEventListener('click', async () => {
        
        const answer = window.confirm('Êtes-vous bien certain de vouloir supprimer votre compte ? Ceci est une action irréversible.');
        
        // if answer is true (if "yes" is checked), then delete account
        if (answer) {
            
            try {
                const response = await fetch('/moncompte/supprimer/compte', { method: 'GET' });
                const data = await response.json();
                
                // if response from serverside is got
                if (data.success) {
                    console.log('compte supprimé');
                    
                    // renavigate to home page
                    return window.location.replace('/');
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

export default deleteAccount;