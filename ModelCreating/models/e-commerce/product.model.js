import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productname:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        default: false,
    },
    category:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    images:{
        type: String,

    },
    stock:{
        type: Number,
        default: 0,
    },
     

},{timestamps: true});


export const Product = mongoose.model("Product", productSchema)