import express from 'express';
import { getTeachers, addTeacher, updateTeacher, deleteTeacher } from '../controllers/teacherController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getTeachers).post(protect, admin, addTeacher);
router.route('/:id').put(protect, admin, updateTeacher).delete(protect, admin, deleteTeacher);

export default router;
