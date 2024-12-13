import mongoose, {Schema} from "mongoose";

const userSchma = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index: true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fulname:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            index: true,
        },
        avtar:{
            type:String,   // cloudnary url
            required:true,
        },
        email:{
            type:String,
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: 'video',
            }
        ],
        pasword: {
            type: String,
            required: [true, 'Password is requiered'],
            minlength: 8,
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)