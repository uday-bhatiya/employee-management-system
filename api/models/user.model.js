import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
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

    role: {
        type: String,
        enum: ["employee", "admin"], 
        default: "employee" 
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;