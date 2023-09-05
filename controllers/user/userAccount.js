const User = require('../../model/User');
const bcrypt = require('bcrypt');
const { slugify } = require('../../model/helpers/slugify');


module.exports.get = async (req, res) => {
    const session = req.session;
    
    try {
        const user = await User.findOne({ email: session.email });
        if (!user) {
            console.log('utilisateur non trouvé');
        }
        
        const activeBillingAddress = user.address.find((address) => address.billingAddress === true);
        const activeDeliveryAddress = user.address.find((address) => address.deliveryAddress === true);
        
        res.status(200).render('user/user_account', { session, errorsArray: '', validationMsg: '', user: user, activeBillingAddress, activeDeliveryAddress, title: 'Útlagi - Mon compte utilisateur' });
    }
    
    catch (err) {
        console.log(err);
    }
};

module.exports.handle_data = async (req, res) => {
    console.log('informations mises à jour !');
    
    const session = req.session;
    const validationMsg = [];
    
    try {
        const user = await User.findOne({ email: session.email });
        
        // checking the address that have to be rendered on the user account page
        const activeBillingAddress = user.address.find((address) => address.billingAddress === true);
        const activeDeliveryAddress = user.address.find((address) => address.deliveryAddress === true);
        
        user.fname = req.body.fname;
        user.slug = slugify(user.fname);
        user.lname = req.body.lname;
        user.email = req.body.email;
        user.phoneNumber = req.body.tel;
        
         validationMsg.push({ data:'Les informations ont bien été mises à jour'});
        
        await user.save();
        
        res.render('user/user_account', { session, errorsArray: '', validationMsg, user, activeBillingAddress, activeDeliveryAddress, title: 'Útlagi - Mon compte utilisateur' });
    }
    catch (err) {
        console.log(err);
    }
};

module.exports.handle_password = async (req, res) => {
    const session = req.session;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const errorsArray = [];
    const validationMsg = [];
    
    const user = await User.findOne({ email: session.email });
    
    // checking the address that have to be rendered on the user account page
    const activeBillingAddress = user.address.find((address) => address.billingAddress === true);
    const activeDeliveryAddress = user.address.find((address) => address.deliveryAddress === true);
    
    // If errors
    if (!currentPassword || !newPassword || !confirmPassword) {
        errorsArray.push({ message: 'Veuillez remplir tous les champs' });
    }
    
    if (newPassword !== confirmPassword) {
        errorsArray.push({ isNotSame: 'Les nouveaux mots de passe ne sont pas identiques'});
    }
    
    if (newPassword.length < 3 || confirmPassword.length < 3) {
        errorsArray.push({ lengths: 'Les nouveaux mots de passe sont trop courts'});
    }
    
    // If validation, then encrypt
    bcrypt.compare(currentPassword, user.password, (err, isSamePassword) => {
        if (err) {
            console.log(err);
        }
        // If match but errors in other fields
        if (errorsArray.length > 0) {
            console.log('password matching but failed other fields');
            
             return res.render('user/user_account', { session, errorsArray, validationMsg: '', user, activeBillingAddress, activeDeliveryAddress, title: 'Útlagi - Mon compte utilisateur' });
        
        // If not match and error in other fields     
        } else if (!isSamePassword || errorsArray.length > 0) {
            errorsArray.push({ msg: 'Le mot de passe actuel n\'est pas le bon' });
            return res.render('user/user_account', { session, errorsArray, validationMsg: '', user, activeBillingAddress, activeDeliveryAddress, title: 'Útlagi - Mon compte utilisateur' });
        }
        
        // If match, then hash new password
        console.log('password matching !');
        validationMsg.push({ pwd: 'Le mot de passe a bien été modifié'});
        user.password = newPassword;
        
        user.save();
        
         res.render('user/user_account', { session, errorsArray, validationMsg, user, activeBillingAddress, activeDeliveryAddress, title: 'Útlagi - Mon compte utilisateur' });
    });
};

module.exports.delete_account = async (req, res) => {
    const session = req.session;
    
    try {
        // find user in db and delete it
        await User.findOneAndDelete({ email: session.email });
        
        // when account is deleted, delete session and redirect to home page
        session.destroy();
        
        res.json({ success: true });
    }
    
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: 'Une erreur est survenue' });
    }
}