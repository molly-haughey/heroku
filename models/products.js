const mongoose = require('mongoose');

const succulentSchema = new mongoose.Schema ({
    name: {type: String},
    img: {type: String},
    price: {min:0, type:Number},
    qty: {min:0, type:Number}
})

const Succulents = mongoose.model('Succulents', succulentSchema);

module.exports = Succulents;