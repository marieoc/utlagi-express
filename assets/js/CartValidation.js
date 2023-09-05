// import
import { useState } from 'react';
import { slugify } from '../../model/helpers/slugify.js';

const customEvent = new Event('change');

const CartValidation = () => {
    // states
    const [shoppingCart, setShoppingCart] = useState(() => {
        const savedItem = localStorage.getItem('products') || '[]';
        const parsedItem = JSON.parse(savedItem);
        return parsedItem;
    });
    
    const standardDeliveryPrice = 2.97;
    
    
    // Change quantity
    const setQuantity = (product, amount) => {
        let updatedArray = [...shoppingCart];
        
        let newQtyToOrder = parseInt(product.qtyToOrder) + amount;
        
        // prevent qty to go under 1
        if (newQtyToOrder < 1) {
            newQtyToOrder = 1;
        }
        else if (newQtyToOrder > product.quantity) {
            newQtyToOrder = product.quantity;
        }
        
        // updated array with qties
        updatedArray = updatedArray.map((item) => item.title === product.title ? { ...item, qtyToOrder: newQtyToOrder, subTotal: (parseFloat(item.price) * parseInt(newQtyToOrder))} : item);
        setShoppingCart(updatedArray);
    
        localStorage.setItem('products', JSON.stringify(updatedArray));
    };
    
    
    // Delete item from shopping cart
    const deleteItem = (event, item) => {
        const itemName = item.title;
        
        // find index of item in shoppingCart array
        const index = shoppingCart.findIndex((item) => item.title === itemName);
        
        // create copy of shoppingCart
        let updatedArray = [...shoppingCart];
        
        // Manipulate copy array and then put it in shoppingCart state
        updatedArray.splice(index, 1);
        setShoppingCart(updatedArray);
        
        // Update localStorage
        localStorage.setItem('products', JSON.stringify(updatedArray));
        
        // Dispatch event so that localStorage gets updated first
        event.currentTarget.dispatchEvent(customEvent);
    }
    
    // Calculate subTotal
    const cartsubTotal = shoppingCart.reduce((total, item) => total + (item.subTotal ? item.subTotal : parseFloat(item.price) * parseInt(item.qtyToOrder)), 0);
    const roundedCartSubTotalPrice = cartsubTotal + standardDeliveryPrice;
    
    
    // Submit cart
    const submitCart = async (event) => {
        event.preventDefault();
        
        console.log('il n\'est pas encore possible de passer commande');    
    }
    
    
    // render
    return (
        <>
            <table className="validate-table">
                <thead>
                    <tr>
                        <td className="product-img"></td>
                        <td className="product-title">Produit</td>
                        <td className="product-price">Prix à l'unité</td>
                        <td className="product-qty">Quantité</td>
                        <td className="items-total">Sous-total</td>
                        <td className="delete-product"></td>
                    </tr>
                </thead>
                <tbody>
                {shoppingCart.length === 0 ? <tr><td className="empty-card-message">Votre panier est vide</td></tr> : shoppingCart.map((item, index) =>
                (
                <tr key={index}>
                    <td className="product-img"><a href={"/produit/" + slugify(item.title)} ><img src={"img/products/" + item.image} /></a></td>
                    <td className="product-title bold-title">{item.title}</td>
                    <td>{item.price} &euro;</td>
                    <td className="product-qty">
                        <div className="flex-center">
                            <button className="decrement-btn change-localstorage" onClick={() => setQuantity(item, -1)}>-</button>
                            <p>{item.qtyToOrder}</p>
                            <button className="increment-btn change-localstorage" onClick={() => setQuantity(item, 1)}>+</button>
                        </div>
                    </td>
                    <td>{item.subTotal ? item.subTotal : item.price} &euro;</td>
                    <td className="delete-product"><button className="delete-product__btn primary-btn change-localstorage" onClick={(event) => deleteItem(event, item)}>X</button></td>
                </tr>
                ))
                }
                </tbody>
            </table>
            
            {shoppingCart.length === 0 
            ? '' 
            :
            <div className="cart-form-wrapper">
                <div className="flex-end">
                    <div className="total-table-wrapper">
                        <h2>Total panier</h2>
                        <table className="total-shoppingcart-table">
                            <thead>
                                <tr>
                                    <td className="bold-title">Sous-total</td>
                                    <td>{cartsubTotal.toFixed(2)} &euro;</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="bold-title">Coûts d'expédition</td>
                                    <td>
                                        <p>Livraison standard: {standardDeliveryPrice} &euro;</p>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="bold-title">Total</td>
                                    <td>{cartsubTotal ? roundedCartSubTotalPrice.toFixed(2) : '0'} &euro;</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                
                <form className="validate-cart-form" onSubmit={submitCart}>
                    <div className="validate-btn__wrapper">
                        <input className="primary-btn" type="submit" value="Finaliser ma commande" />
                    </div>
                </form>
            </div>
            }
        </>
    )
};

export default CartValidation;