import mongoose from "mongoose";


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
},{timestamps:true});

export const User = mongoose.model("User", userSchema);



// below code is the basic implementation of creating a new schema object


// import mongoose from "mongoose";


// const userTestSchema = new mangoose.Schema({},{timestamps:true});

// export const TestUser = mongoose.model("TestUser", userSchema);
