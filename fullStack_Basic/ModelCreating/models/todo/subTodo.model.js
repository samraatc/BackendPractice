import mongoose from 'mongoose';

const  subTodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    content:{
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TodoUser"
    }
},{timeStamps:true});

const SubTodo = mongoose.model('SubTodo', subTodoSchema);

export default SubTodo;