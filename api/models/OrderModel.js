const  mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    userId: String,
    items: [{
        productId: String,
        quantity: Number
    }],
    amount: Number,
    address: String,
    contact: String,
    status: {type:String, default: "pending"}

}, {timestamps: true}
);

module.exports = mongoose.model('Order', OrderSchema);