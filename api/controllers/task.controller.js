import Task from '../models/task.model.js';

const createTask = async (req, res) => {
    try {
        const { taskTitle, taskDescription, taskDate, category, asignedTo } = req.body;
        if (!taskTitle || !taskDescription || !taskDate || !category || !asignedTo) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const newTask = new Task({
            taskTitle,
            taskDescription,
            taskDate,
            category,
            asignedTo,
            active: false,
            newTask: true,
            failed: false,
            completed: false
        });

        const savedTask = await newTask.save();

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: savedTask
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export { createTask }