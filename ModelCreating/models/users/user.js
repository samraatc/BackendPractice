import mongoose from "mongoose";
import mangoose from "mongoose";


const userSchema = new mangoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConfirmation:{
        type: String,
        required: true,
        validate: {
            validator: function(passwordConfirmation) {
                return passwordConfirmation === this.password;
            },
            message: "Passwords do not match."
        }
    },
},{timestamps:true});

export const User = mongoose.model("User", userSchema);