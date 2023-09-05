import { createRoot } from 'react-dom/client';
import DeleteComment from './DeleteComment.js';
import ShoppingCart from './ShoppingCart';
import CartValidation from './CartValidation';
import toggleMenu from './toggleMenu.js';
import toggleSections from './toggleSections.js';
import dropDownFile from './dropDownFile.js';
import handleFormButtons from './handleFormButtons.js';
import deleteAccount from './deleteAccount.js';
import Slider from './Slider.js';
import addToCart from './addToCart.js';
import WishList from './WishList.js';
import WishListButton from './WishListButton.js';
import tinyMceConfig from './tinyMceConfig.js';
import ContactForm from './ContactForm.js';
import deleteItem from './deleteItem.js';
import deleteArticle from './deleteArticle.js';


// Opt-in to Webpack hot module replacement
if (module.hot) module.hot.accept();


// Render React components
if (document.getElementById('sliderWrapper')) {
    const SliderWrapper = createRoot(document.getElementById('sliderWrapper'));
    SliderWrapper.render(<Slider />);
}

if (document.getElementById('commentsWrapperRoot')) {
    const commentsWrapper = createRoot(document.getElementById('commentsWrapperRoot'));
    commentsWrapper.render(<DeleteComment />);
}


if (document.getElementById('addToWishListButton-wrapper')) {
    const wishListButtonWrapper = createRoot(document.getElementById('addToWishListButton-wrapper'));
    wishListButtonWrapper.render(<WishListButton />);
}


if (document.getElementById('wishlistSection')) {
    const wishListSection = createRoot(document.getElementById('wishlistSection'));
    wishListSection.render(<WishList />);
}

if (document.getElementById('cartValidationSection')) {
    const cartValidationSection = createRoot(document.getElementById('cartValidationSection'));
    cartValidationSection.render(<CartValidation />);
}


if (document.getElementById('shoppingCart')) {
    const shoppingCartMenu = createRoot(document.getElementById('shoppingCart'));
    shoppingCartMenu.render(<ShoppingCart />);
}

if (document.getElementById('contactFormRoot')) {
    const contactFormRoot = createRoot(document.getElementById('contactFormRoot'));
    contactFormRoot.render(<ContactForm />);
}


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('editorPageHeader')) {
        tinyMceConfig();
    }
});


addToCart();
toggleMenu();
toggleSections();
dropDownFile();
handleFormButtons();
deleteAccount();
deleteItem();
deleteArticle();

