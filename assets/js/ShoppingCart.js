// import
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


const ShoppingCart = () => {
    // States
    const [shoppingCart, setShoppingCart] = useState(() => {
        const savedItem = localStorage.getItem('products') || '[]';
        const parsedItem = JSON.parse(savedItem);
        return parsedItem;
    });

    
    useEffect(() => {
        // BUTTONS THAT CHANGE LOCAL STORAGE (from wishlist page + cart validation page)
        const btns = document.querySelectorAll('.change-localstorage');
        
        btns?.forEach(btn => {
            btn?.addEventListener('change', () => {
                console.log('onChange');
                setShoppingCart(JSON.parse(localStorage.getItem('products')));
                
            });
        })
        
        // Clean up function pour addEventListener
        return () => {
            btns?.forEach(btn => {
                btn?.removeEventListener('change', () => {
                console.log('onChange');
                setShoppingCart(JSON.parse(localStorage.getItem('products')));
                })
            })
        }
        
        
        // ADD BUTTON EVENT --- PRODUCT PAGE
        const addButtonfromProductPage = document.getElementById('addToCartBtn');
         
        addButtonfromProductPage?.addEventListener('click', (event) => {
            // console.log('product page')
            setShoppingCart(JSON.parse(localStorage.getItem('products')));
        });
        
        // Clean up function pour addEventListener
        return () => {
            addButtonfromProductPage?.removeEventListener('click', (event) => {
                setShoppingCart(JSON.parse(localStorage.getItem('products')));
            })
        }
        
    }, []);



    // Delete item
    const deleteItem = (event, item) => {
        // if on cartValidation Page, then reload page to synchronize both modal and cartValidation table
        const cartValidationTable = document.querySelector('.validate-table');
        
        if (cartValidationTable) {
            console.log('mis à jour')
            window.location.reload();
        }
        
        const index = shoppingCart.findIndex((el) => el.title === item.title);
        let updatedArray = [...shoppingCart];

        updatedArray.splice(index, 1);
        setShoppingCart(updatedArray);
        
        // Dispatch event so that localStorage gets updated first
        event.currentTarget.dispatchEvent(customEvent);

        localStorage.setItem('products', JSON.stringify(updatedArray));
        
    };

    // Toggle modalBox
    const toggleModalBox = () => {
        const modalBox = document.getElementById('modalBox-wrapper');
        modalBox.classList.toggle('active');
    };
    

    // render
    return (
        <>
        <button id="toggleShoppingList" className="cart-toggle-btn" onClick={toggleModalBox}>
            <span className="number">{shoppingCart.length === 0 ? 0 : shoppingCart.length}</span>
            <i id="shoppingBag" className="fa-solid fa-bag-shopping"></i>
        </button> 
        <div id = "modalBox-wrapper"
        className = "hidden" >
        <div className="modal-box">
                <div id="itemShoppingList">
                    {shoppingCart.length === 0 ? 'Votre panier est vide'
                    : shoppingCart.map((item, index) =>
                    (
                    <div key={index} className="cart-item">
                        <a href={"/produit/" + slugify(item.title)} className="cart-item__data">
                            <div className="cart-img__wrapper">
                                <img src={"/img/products/" + item.image} alt={item.title} />
                            </div>
                            <div className="cart-data__wrapper">
                                <p>{item.title}</p>
                            </div>
                        </a>
                        <div className="units-wrapper" >
                            <div className="unit-price">{item.subTotal ? item.subTotal : item.price } &euro;</div>
                        </div>
                        <div className="delete-btn-wrapper">
                            <button id="deleteFromCart" className="delete-btn change-localstorage" onClick={() => deleteItem(event, item)}>X</button>
                        </div>
                    </div>
                    )
                    )}
                </div>
                <div className="redirect-cart-btn-wrapper">
                    <a className="primary-btn" href="/panier">Valider mon panier</a>
                </div>
            </div>
        </div> 
        </>
    );
};

export default ShoppingCart;
