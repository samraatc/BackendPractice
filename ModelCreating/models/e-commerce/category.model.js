import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    categoryname:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    prodectof:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }
},{timestamps: true});


export const Category = mongoose.model("Category", categorySchema)