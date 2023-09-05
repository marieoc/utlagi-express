const User = require('../../model/User');

module.exports.get = async (req, res) => {
    const session = req.session;
    
    try {
        const user = await User.findOne({ email: session.email });
        
        res.render('user/addUserAddress', { session: session, user: user, title: 'Útlagi - Ajouter une adresse' });
    }
     catch (err) {
         console.log(err);
     }
};

// add address
module.exports.add_address = async (req, res) => {
    const session = req.session;
    
    console.log('adresse ajoutée !')
    
    try {
        // find session matching user
        const user = await User.findOne({ email: session.email });
        
        if (!user) {
            console.log('utilisateur non trouvé');
            return res.redirect('back');
        }
        
        // New ressource
        const newAddress = {
            street: req.body.street,
            zipCode: req.body.zipCode,
            city: req.body.city,
            country: req.body.country,
            billingAddress: req.body.billingAddress === 'on' ? true : false,
            deliveryAddress: req.body.deliveryAddress === 'on' ? true : false
        };
        
        
        // check if another address has 'billingAddress === true' and 'deliveryAddress === true'
        const isBillingAddress = user.address.find((address) => address.billingAddress === true)
        const isDeliveryAddress = user.address.find((address) => address.deliveryAddress === true)
        
        // if newAddress.billingAddress is true, then put other billingAddress to false
        if (newAddress.billingAddress === true && isBillingAddress) {
            user.address.forEach((address) => {
                address.billingAddress = false;
            })
        }
        
        // if newAddress.deliveryAddress is true, then put other deliveryAddress to false
        if (newAddress.deliveryAddress === true && isDeliveryAddress) {
            user.address.forEach((address) => {
                address.deliveryAddress = false;
            })
        }
        
        
        // push new address in user document
        user.address.push(newAddress);
        console.log(user.address);
        
        // save and update in database
        await user.save();
        
        res.redirect('/moncompte');
    }
    
    catch (err) {
        console.log(err);
    }
};