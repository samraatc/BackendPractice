import mongoose from 'mongoose';

// orderitemSchema schema is defined for the number of qunatity needed for particuler items
const orderitemSchema = new mongoose.Schema({
    producrId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity:{
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    orderpeice:{
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    orderedproduct:{
        type: mongoose.Schema.ObjectId,
        ref: "Product",
    },
    quentity:{
        type: String,
        required: true,
    },

    orderitem:{
        type: [orderitemSchema]
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["PENDING", "CANCLELLED", "DELIVERED"],
        default: "PENDING",
    }

},{timestamps: true});


export const Order = mongoose.model("Order", orderSchema)