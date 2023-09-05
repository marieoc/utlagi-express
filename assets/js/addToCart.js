// if not existing, create array and key-value pair for storing localStorage data

const addToCart = () => {
    const customEvent = new Event('change');

    const addBtn = document.getElementById('addToCartBtn');
    
    if (addBtn) {
        // If item is out of stock, then button is disabled
        const dataProduct = JSON.parse(addBtn.getAttribute('data-product'));
        const outOfStockMessage = document.querySelector('.out-of-stock');
        
        if (parseInt(dataProduct.quantity) === 0) {
            addBtn?.classList.add('disabled');
            outOfStockMessage.innerText = 'Ce produit est actuellement en rupture de stock';
        }
        
        
        // Event when button is clicked
        addBtn?.addEventListener('click', function (event) {
            const basket = JSON.parse(localStorage.getItem('products')) || [];
            const shoppingItem = JSON.parse(event.currentTarget.getAttribute('data-product'));
            
            const itemName = shoppingItem.title;
            
            const repeated = basket.find((item) => item.title === itemName);
            if (!repeated && shoppingItem.quantity > 0) {
                basket.push(shoppingItem);
            }
            localStorage.setItem('products', JSON.stringify(basket));
            
            // Dispatch event so the localStorage gets updated first
            event.currentTarget.dispatchEvent(customEvent);
        });
    }
}

export default addToCart;