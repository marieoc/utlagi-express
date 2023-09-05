const User = require('../../model/User');

module.exports.get = async (req, res) => {
    const session = req.session;
    
    const addressId = req.params.id;
    
    try {
        const user = await User.findOne({ email: session.email });
        const address = user.address.id(addressId);
        
        res.render('user/handleUserAddress', { session: session, user: user, address: address, title: 'Útlagi - Modifier une adresse' });
    }
     catch (err) {
         console.log(err);
     }
};


// modify address
module.exports.modify_address = async (req, res) => {
    console.log('adresse modifiée !');
    const session = req.session;
    
    const addressId = req.params.id;
    
    try {
        const user = await User.findOne({ email: session.email });
        const modifiedAddress = user.address.id(addressId);
        
        // if modified address gets billingAddress to 'true', put other address.billingAddress to 'false'
        if (req.body.billingAddress === 'on') {
            user.address.forEach((address) => {
                if (address.id !== modifiedAddress.id) {
                    address.billingAddress = false;
                }
            });
        }
        
        // if modified address gets deliveryAddress to 'true', put other address.deliveryAddress to 'false'
        if (req.body.deliveryAddress === 'on') {
            user.address.forEach((address) => {
                if (address.id !== modifiedAddress.id) {
                    address.deliveryAddress = false;
                }
            });
        }
        
        modifiedAddress.street = req.body.street;
        modifiedAddress.zipCode = req.body.zipCode;
        modifiedAddress.city = req.body.city;
        modifiedAddress.country = req.body.country;
        modifiedAddress.billingAddress = req.body.billingAddress === 'on' ? true : false;
        modifiedAddress.deliveryAddress = req.body.deliveryAddress === 'on' ? true : false;
        

        // update database
        await user.save();

        res.redirect('/moncompte');
        
    } catch (err) {
        console.log(err);
    }
};


// delete address
module.exports.delete_address = async (req, res) => {
    console.log('adresse supprimée !');
    const session = req.session;
    const addressId = req.params.id;
    
    try {
        const user = await User.findOneAndUpdate({ email: session.email }, { $pull: { address: { _id: addressId } } }, { new: true });
        
        user.save();
        
        res.redirect('/moncompte');
    }
    
    catch (err) {
        console.log(err);
    }
};