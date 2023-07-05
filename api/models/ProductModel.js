const  mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    title: String,
    img: String,
    description: String,
    price: Number,
    productId: {type: String, require:true, unique: true},
    isActive: {type: Boolean, default: true}
   
});

module.exports = mongoose.model('Product', ProductSchema);