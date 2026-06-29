import { Router } from 'express';

import {
  getAllBuku,
  getBukuById,
  createBuku,
  updateBuku,
  deleteBuku
} from '../controllers/bukuController.js';

import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

// Mahasiswa & Petugas
router.get('/', getAllBuku);
router.get('/:id', getBukuById);

// Hanya Petugas
router.post('/', authenticateToken, createBuku);
router.put('/:id', authenticateToken, updateBuku);
router.delete('/:id', authenticateToken, deleteBuku);

export default router;