import { Router } from 'express';

import {
  getAllKategori,
  getKategoriById,
  createKategori,
  updateKategori,
  deleteKategori
} from '../controllers/kategoriController.js';

import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

// Mahasiswa & Petugas
router.get('/', getAllKategori);
router.get('/:id', getKategoriById);

// Hanya Petugas
router.post('/', authenticateToken, createKategori);
router.put('/:id', authenticateToken, updateKategori);
router.delete('/:id', authenticateToken, deleteKategori);

export default router;