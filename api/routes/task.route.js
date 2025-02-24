import express from 'express';
import { createTask, getAllTask } from '../controllers/task.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', createTask);
router.get('/get-tasks', getAllTask)

export default router;