import mongoose from 'mongoose';



const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    }, 
    complete:{
        type: Boolean,
        default: false,
    },
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,    // used for refring the other model
        ref: "TodoUser"      // refrance of model where "TodoUser" is TodoUser schema model in todoUser.model.js which is refrin to todoUser.model.js file
        
    },
    subTodos: [   // if we need to define the array we can use ["to create array"] here subtodo in todo model create number of subtodos in array

        {
            type: mongoose.Schema.types.ObjectId,
            ref : "SubTodo"

        },
    ]
},{timeStamps:true});

export const Todo =  mongoose.model("Todo", todoSchema);