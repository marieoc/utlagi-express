import { useState, useEffect } from 'react';

// function for href in Reac component
function slugify(str) {
	return str
		.toLowerCase()
		.trim()
		.replace(/['.]/g, "")
		.replace(/[:;]/g, "")
		.replace(/[\s_-]+/g, "")
		.replace(/[éèê]/g, "e")
		.replace(/[ùüú]/g, "u")
		.replace(/^-+|-+$/g, "");
};

const customEvent = new Event('change');


const WishList = () => {
    // States
    const [wishList, setWishList] = useState([]);
    
    useEffect(() => {
        // retrieve wishlist from db user
        fetch('/moncompte/listedenvie/items', { method: 'GET', headers: {
                'Content-Type': 'application/json'
            } })
        .then(response => {
            return response.json();
        })
        .then(data => {
            setWishList(data)
        })
        .catch(error => {
            console.log(error);
        });
    }, [])
    
    
    
    // 'Add to cart' button from WISH LIST PAGE (add to localStorage)
    const addToCartFromWishListPage = (event, item) => {
        const basket = JSON.parse(localStorage.getItem('products')) || [];
        const itemName = item.title;
        
        let repeated = basket.find((item) => item.title === itemName);
        if (!repeated && item.quantity > 0) {
            console.log('added to cart from wishlist page')
            basket.push(item);
        }
        
        localStorage.setItem('products', JSON.stringify(basket));
        
        // dispatch custom event so shoppingcart gets all the items from localStorage before it get new other ones
        
        event.currentTarget.dispatchEvent(customEvent);
        
    }
    
    
    // Delete item
    const deleteItem = (item) => {
        fetch(`/moncompte/listedenvie/supprimer/${item.slug}`, { method: 'DELETE' })
            .then(response => {
                if (response.status === 200) {
                    // find item in user wishlist
                    const index = wishList.findIndex((el) => el.slug === item.slug);
                    
                    // Copy array and remove item inside
                    let newArray = [...wishList];
                    newArray.splice(index, 1);
                    
                    // Put updated array in wishlist state
                    setWishList(newArray);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    // Render
    return (
    <>
        <div className="wishlist">
        
            {wishList.length === 0 ? <p className="bold">Votre liste d'envie est vide</p> : wishList.map((item, index) => 
            (
            <div key={index} className="wishlist-item">
                <a href={"/produit/" + slugify(item.title)}>
                    <div className="cart-img__wrapper">
                        <img src={"/img/products/" + item.image} alt={item.title} />
                    </div>
                    <div className="cart-data__wrapper">
                        <p>{item.title}</p>
                    </div>
                </a>
                <div className="flex-btn-wrapper">
                    <button id="addToBtn" className="add-item__btn add-wishlist-item primary-btn change-localstorage" onClick={(event) => addToCartFromWishListPage(event, item)}>Ajouter au panier</button>
                    <button className="delete-item__btn change-localstorage" onClick={() => deleteItem(item)}>Enlever de la liste</button>
                </div>
                
            </div>
            )
            )}
        
        </div>
    </>
    )
}

export default WishList;

