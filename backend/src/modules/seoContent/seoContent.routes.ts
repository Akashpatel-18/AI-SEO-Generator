import express from 'express';
import * as seoContentController from './seoContent.controller';
import { protect } from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/generate', protect, seoContentController.generate);
router.get('/history', protect, seoContentController.getHistory);

export default router;
