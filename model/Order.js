const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    email: String,
    phoneNumber: String,
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
    }
});

// Compile model from schema
const Order = mongoose.model('order', orderSchema);

module.exports = Order;
