import mongoose from "mongoose";

const boardSchema =  mongoose.Schema({
    name: { type: String, required: true },
},
{
    timestamps: true
})

const taskSchema =  mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {type: String}, 
    priority: {type: String}, 
    assignedTo: {type: String}, 
    dueDate: {type: String},
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board_data"}
},
{
    timestamps: true
})


const Board = mongoose.model("Board_data", boardSchema);
const Task = mongoose.model("task_data", taskSchema);

export {Board, Task};