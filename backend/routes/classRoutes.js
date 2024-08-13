import express from 'express';
import { getClasses, addClass ,getAllClasses} from '../controllers/classController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getClasses).post(protect, admin, addClass);
router.route('/getAllClasses').get( getAllClasses)

export default router;
