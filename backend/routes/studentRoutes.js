import express from 'express';
import { getStudents, addStudent, updateStudent, deleteStudent } from '../controllers/studentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getStudents)
  .post(protect, admin, addStudent);

router.route('/:id')
  .put(protect, admin, updateStudent)
  .delete(protect, admin, deleteStudent);

export default router;
