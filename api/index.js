import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import coockieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRouter from './routes/user.route.js';
import taskRouter from './routes/task.route.js';


dotenv.config();

connectDB();

const app = express();


app.use(cors({
    origin: "https://employee-management-system-lhu2.onrender.com/", 
    credentials: true,
}));
app.use(express.json());
app.use(coockieParser());

app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});