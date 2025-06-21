import express from 'express'
import mongoose from 'mongoose';
import { Board, Task } from '../Models/allModel.js'
export const Routes = express.Router();

// =======================================================    Routes for Users     =============================================================================


Routes.get('/boards', async (req, res) => {
    const allBoards = await Board.find();
    res.status(201).json({ message: "Boards fetched successfully.", boards: allBoards });
})

Routes.post('/boards', async (req, res) => {
    const boardData = req.body; // Assuming board data is sent in the request body
    const newBoard = new Board(boardData);
    await newBoard.save();

    res.status(201).json({ message: "Board created successfully.", board: newBoard });
})

Routes.get('/boards/:id/tasks', async (req, res) => {
    const boardId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return res.status(400).json({ message: "Invalid board ID" });
    }

    const tasks = await Task.find({ boardId: new mongoose.Types.ObjectId(`${boardId}`) });
    res.status(200).json({ message: "Tasks fetched successfully.", tasks: tasks });
})

Routes.post('/boards/:id/tasks', async (req, res) => {
    const boardId = req.params.id;
    const taskData = req.body; 
    const newTask = new Task({ ...taskData, boardId: boardId  });
    await newTask.save();   
    res.status(201).json({ message: "Task created successfully.", task: newTask });
})


Routes.put('tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const updatedTaskData = req.body; // Assuming updated task data is sent in the request body
    res.send(`Updated task with ID: ${taskId} with data: ${JSON.stringify(updatedTaskData)}`);
})

Routes.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
    }   
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully." });
})