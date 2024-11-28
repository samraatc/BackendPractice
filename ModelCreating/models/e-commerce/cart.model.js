import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    usre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Product"
        }
    ]
},{timestamps: true});


export const Cart = mongoose.model("Cart", cartSchema)