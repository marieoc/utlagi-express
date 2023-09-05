const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


// Create a Schema 
const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'Veuillez renseigner un prénom'],
        minlength: [2, 'Veuillez renseigner un prénom d\'au moins 2 caractères'],
    },
    lname: {
        type: String,    
    },
    slug: String,
    email: {
        type: String,
        required: [true, 'Veuillez renseigner une adresse mail'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Veuillez renseigner une adresse mail valide'], // return true or false
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Veuillez renseigner un mot de passe'],
        minlength: [3, 'Veuillez renseigner un mot de passe d\'au moins 3 caractères'],
    },
    role: String,
    address: [
        {
            street: String,
            zipCode: String,
            city: String,
            country: String,
            billingAddress: Boolean,
            deliveryAddress: Boolean,
        }
    ],
    phoneNumber: String,
    wishList: [
        {
            title: String,
            slug: String,
            price: String,
            image: String,
            quantity: String,
            qtyToOrder: String
        }
    ],
    orderBook: [
        {
            email: String,
            dateOfPurchase: String,
            orderStatus: String,
            purchasedProducts: [
                {
                    image: String,
                    title: String,
                    price: String,
                    qtyToOrder: String,
                    subTotal: String,
                }
            ],
            total: String,
            paymentDetails: String,
            chosenDeliveryAddress: {
                street: String,
                zipCode: String,
                city: String,
                country: String,
            },
            chosenBillingAddress: {
                street: String,
                zipCode: String,
                city: String,
                country: String,
            },
        }
    ]
});


// fire a function before doc is saved to created (does not work with arrow function !)
// Hash the password before saving it to the db (1st, create a salt)
userSchema.pre('save', async function(next) {
    try {
        console.log('utilisateur sur le point d\'être créé'); // this refers to instance created in signup.post
    
        if (this.isModified('password')) {
            
            this.password = await bcrypt.hash(this.password, 10);
            next();
        }
    }
    catch (err) {
        return next(err);
    }
    
});


// fire a function after doc is created
userSchema.post('save', function(doc, next) {
    next();
});



// Compile model from schema
const User = mongoose.model('user', userSchema); // name always in singular, because db will add a 's' on it

module.exports = User;