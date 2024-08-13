// src/routes/authRoutes.js
import express from 'express';
import { authUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authUser); // Make sure this matches the endpoint
router.post('/signup', registerUser);

export default router;
