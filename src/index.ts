import express from 'express';
import { sql } from 'drizzle-orm';
import cors from 'cors';

import { db } from './db/index.js';

import authRoutes from './routes/authRoutes.js';
import bukuRoutes from './routes/bukuRoutes.js';
import kategoriRoutes from './routes/kategoriRoutes.js';
import rakRoutes from './routes/rakRoutes.js';

import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Health Check
app.get('/health', async (_req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    return res.json({
      status: 'ok',
      message: 'Database terhubung'
    });
  } catch {
    return res.status(500).json({
      status: 'error',
      message: 'Database gagal terhubung'
    });
  }
});

// Routes
app.use('/auth', authRoutes);
app.use('/buku', bukuRoutes);
app.use('/kategori', kategoriRoutes);
app.use('/rak', rakRoutes);

// Root Endpoint
app.get('/', (_req, res) => {
  res.json({
    aplikasi: 'Sistem Informasi Katalog Perpustakaan',
    version: '1.0.0'
  });
});

// Error Handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});