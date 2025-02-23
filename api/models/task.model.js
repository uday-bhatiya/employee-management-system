import mongoose, {Schema} from 'mongoose';

const taskSchema = new Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    category: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    newTask: {
        type: Boolean,
        required: true,
        default: true
    },
    failed: {
        type: Boolean,
        required: true,
        default: false
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },

    asignedTo: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

export default Task;