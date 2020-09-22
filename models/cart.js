const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema ({
    name: {type: String},
    img: {type: String},
    price: {min:0, type:Number},
    qty: {min:0, type:Number}
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;