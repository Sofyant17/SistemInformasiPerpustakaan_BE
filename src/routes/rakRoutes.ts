import { Router } from 'express';

import {
  getAllRak,
  getRakById,
  createRak,
  updateRak,
  deleteRak
} from '../controllers/rakController.js';

import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

// Mahasiswa & Petugas
router.get('/', getAllRak);
router.get('/:id', getRakById);

// Hanya Petugas
router.post('/', authenticateToken, createRak);
router.put('/:id', authenticateToken, updateRak);
router.delete('/:id', authenticateToken, deleteRak);

export default router;