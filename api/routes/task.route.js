import express from 'express';
import { createTask } from '../controllers/task.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', createTask);

export default router;