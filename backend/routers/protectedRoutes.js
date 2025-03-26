import express from 'express';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin-only route
router.get('/admin', verifyToken, verifyRole(['admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin!' });
});

// User route
router.get('/user', verifyToken, verifyRole(['user', 'admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome User!' });
});

export default router;
