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

const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find().populate({
            path: 'asignedTo',
            select: '-password'
        });

        if (!tasks) {
            return res.status(401).json({
                success: false,
                message: "Failed to fetch tasks"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

const getEmpTask = async (req, res) => {
    try {
        const { userId } = req.user;

        // console.log(userId)

        const tasks = await Task.find({
            asignedTo: userId
        }).populate({
            path: 'asignedTo',
            select: '-password'
        });

        if (!tasks) {
            return res.status(401).json({
                success: false,
                message: "Failed to fetch tasks"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const acceptTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Task ID is required'
            });
        }
        // console.log(id)
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { active: true },
            { new: true } // Return updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const completeTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Task ID is required'
            });
        }
        // console.log(id)
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { completed: true, failed: false },
            { new: true } // Return updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const FailTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Task ID is required'
            });
        }
        // console.log(id)
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { failed: true, completed: false },
            { new: true } // Return updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate({ path: 'asignedTo', select: '-password'});
        if (!task) return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
        res.json({
            success: true,
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateTask = async (req, res) => {
    try {
        // console.log('Request Body:', req.body);

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },  
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ 
                success: false, 
                message: "Task not found"
             });
        }
        res.json({
            success: true,
            task: updatedTask
        });
        console.log(updatedTask)
    } catch (error) {
        res.status(500).json({
            success: false, message:
                error.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { createTask, getAllTask, getEmpTask, acceptTask, completeTask, FailTask, getTaskById, updateTask, deleteTask }