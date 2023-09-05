// ------- //
// MODULES
// ------- //
const express = require('express');

// Call all the controllers
// Home controller
const homeController = require('../controllers/home');

// Shop controllers
const shopController = require('../controllers/shop');
const productController = require('../controllers/product');

// Nesws controllers
const newsController = require('../controllers/news');
const newsArticleController = require('../controllers/article');

// Contact & authentification controllers
const contactFormController = require('../controllers/contact');
const authentificationController = require('../controllers/authentification');

// User controllers
const userAccountController = require('../controllers/user/userAccount');
const wishListController = require('../controllers/user/wishList');
const addUserAddressController = require('../controllers/user/addUserAddress');
const handleUserAddressController = require('../controllers/user/handleUserAddress');

// Admin controllers
const adminAccountController = require('../controllers/admin/adminAccount');
const handleItemController = require('../controllers/admin/handleItem');
const handleArticleController = require('../controllers/admin/handleArticle');
const handleContactForm = require('../controllers/admin/handleContactForm');

// Order validation page controller
const cartValidationPageController = require('../controllers/cartValidation');

// ------------ //
// HANDLE ROUTES
// ------------ //
// Create router
const router = express.Router();

// ------------- //
// HANDLE HOME PAGE
// ------------- //
router.get('/', homeController.get);
router.post('/newsletter', homeController.post);

// ------------- //
// HANDLE SHOP PAGE
// ------------- //
router.get('/boutique', shopController);

// ----------------- //
// HANDLE PRODUCT PAGE
// ----------------- //
router.get('/produit/:name', productController.get);
// Add product to wishlist
router.get('/produit/:name/wishlist', productController.retrieve_wishlist);
router.post('/produit/:name/ajouter/wishlist', productController.add_to_wishlist);
// Handle comment section on product page
router.get('/produit/:name/comments', productController.retrieve_comments);
router.post('/produit/:name/ajouter/commentaire', productController.add_comment);
router.delete('/produit/:name/supprimer/:commentId', productController.delete_comments);

// -------- //
// HANDLE NEWS
// -------- //
router.get('/actualites', newsController);

// ----------------- //
// HANDLE ARTICLE PAGE
// ----------------- //
router.get('/actualites/:name', newsArticleController);

// ----------------- //
// HANDLE CONTACT PAGE
// ----------------- //
router.get('/contact', contactFormController.get);
router.post('/contact', contactFormController.post);

// ----------------------- //
// HANDLE LOGIN/SIGNUP/LOGOUT
// ----------------------- //
router.get('/connexion', authentificationController.get);
router.post('/connexion/signup', authentificationController.signup_post);
router.post('/connexion/login', authentificationController.login_post);
router.get('/deconnexion', authentificationController.logout);

// --------------------- //
// HANDLE USER ACCOUNT PAGE
// --------------------- //
router.get('/moncompte', userAccountController.get);
// Wishlist page - User account
router.get('/moncompte/listedenvie', wishListController.get);
router.get('/moncompte/listedenvie/items', wishListController.retrieve_wishlist);
router.delete('/moncompte/listedenvie/supprimer/:name', wishListController.delete_wishlistItems);

// modify personal data - User account
router.post('/moncompte/gerer/informations', userAccountController.handle_data);
router.post('/moncompte/gerer/motdepasse', userAccountController.handle_password);

// delete user account
router.get('/moncompte/supprimer/compte', userAccountController.delete_account);

// Address page - User account
// add address
router.get('/moncompte/ajouter/adresse', addUserAddressController.get);
router.post('/moncompte/ajouter/adresse', addUserAddressController.add_address);

// modify or delete address
router.get('/moncompte/gerer/adresse/:id', handleUserAddressController.get);
router.post('/moncompte/gerer/adresse/:id', handleUserAddressController.modify_address);
router.get('/moncompte/supprimer/adresse/:id', handleUserAddressController.delete_address);

// ----------------- //
// HANDLE ADMIN PAGE //
// ----------------- //
router.get('/admin', adminAccountController.get);
router.post('/admin/gerer/informations', adminAccountController.handle_data);
router.post('/admin/gerer/motdepasse', adminAccountController.handle_password);
router.post('/admin/ajouter/item', adminAccountController.item);
router.post('/admin/ajouter/article', adminAccountController.article);

// Modify or delete item - Admin account
router.get('/admin/gerer/item/:name', handleItemController.get);
router.post('/admin/gerer/item/:name', handleItemController.modify_item);
router.get('/admin/supprimer/item/:name', handleItemController.delete_item);

// Modify or delete article - Admin account
router.get('/admin/gerer/article/:name', handleArticleController.get);
router.post('/admin/gerer/article/:name', handleArticleController.modify_article);
router.get('/admin/supprimer/article/:name', handleArticleController.delete_article);

// Answer contact forms
router.get('/admin/contact/:name', handleContactForm.get);
router.post('/admin/contact/:name', handleContactForm.answer_form);

// ------------------------- //
// HANDLE ORDER VALIDATION PAGE
// ------------------------- //
router.get('/panier', cartValidationPageController.get);


module.exports = router;