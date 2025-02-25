import express from 'express';
import { acceptTask, completeTask, createTask, FailTask, getAllTask, getEmpTask } from '../controllers/task.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', createTask);
router.get('/get-tasks', getAllTask);
router.get('/get-emp-tasks', authMiddleware, getEmpTask);
router.patch('/accept-task/:id', authMiddleware, acceptTask);
router.patch('/complete-task/:id', authMiddleware, completeTask);
router.patch('/fail-task/:id', authMiddleware, FailTask);

export default router;