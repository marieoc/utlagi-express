import { useState, useEffect } from 'react';


const WishListButton = () => {
    const [wishList, setWishList] = useState([]);
    const star = document.querySelector('.wishlist-star');
    
    
    const productDataString = document.getElementById('addToWishListButton-wrapper').getAttribute('data-product');
    const productData = JSON.parse(productDataString);

    useEffect(() => {
        // retrieve user wishlist from db
        fetch(`/produit/${productData.slug}/wishlist`, { method: 'GET', headers: {
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
    
    // when item is already in db wishlist, then star is full
    const repeated = wishList.find((item) => item.slug === productData.slug);
    if (repeated) {
        star.classList.add('fa-solid');
        console.log('repeated');
    }
    
    // event
    const addToWishList = (event) => {
        // check if item is already in db user's wishlist
        const alreadyInWishlist = wishList.find((item) => item.slug === productData.slug);
        
        // if not, save item in wishlist via POST request
        if (!alreadyInWishlist) {
            wishList.push(productData);
            
            star.classList.add('fa-solid');
            
            fetch(`/produit/${productData.slug}/ajouter/wishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
            .then(response => {
                console.log('item bien enregistré dans la wishlist !')
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            console.log('item already in wishlist !')
        }
    }
    
    return (
        <>
            <button
            id="addToWishList"
            className="add-to-wishlist-button"
            onClick={(event) => addToWishList(event)}
            >
            Ajouter à ma liste d'envie
            <i className="wishlist-star fa-regular fa-star"></i>
            </button>
        </>
    )
}

export default WishListButton;