import express from 'express';
import { getMe, login, logout, register } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getMe);
router.get('/logout', authMiddleware, logout);

export default router;