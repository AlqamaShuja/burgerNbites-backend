const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    key: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: true });



const Product = mongoose.model("Product", productSchema);
module.exports = Product;