import type {
  Request,
  Response,
  NextFunction
} from 'express';

import {
  asc,
  desc,
  count,
  eq,
  like
} from 'drizzle-orm';

import { db } from '../db/index.js';
import { buku } from '../db/buku.js';
import { kategoriBuku } from '../db/kategoriBuku.js';
import { rak } from '../db/rak.js';

// ======================================
// CREATE BUKU
// ======================================
export async function createBuku(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const {
      judul,
      penulis,
      penerbit,
      tahunTerbit,
      stok,
      idKategori,
      idRak
    } = req.body;

    if (
      !judul ||
      !penulis ||
      !penerbit ||
      !tahunTerbit ||
      !stok ||
      !idKategori ||
      !idRak
    ) {
      return next({
        statusCode: 400,
        message: 'Semua field wajib diisi'
      });
    }

    const kategori = await db
      .select()
      .from(kategoriBuku)
      .where(eq(kategoriBuku.id, Number(idKategori)))
      .limit(1);

    if (!kategori[0]) {
      return next({
        statusCode: 404,
        message: 'Kategori tidak ditemukan'
      });
    }

    const dataRak = await db
      .select()
      .from(rak)
      .where(eq(rak.id, Number(idRak)))
      .limit(1);

    if (!dataRak[0]) {
      return next({
        statusCode: 404,
        message: 'Rak tidak ditemukan'
      });
    }

    await db.insert(buku).values({
      judul,
      penulis,
      penerbit,
      tahunTerbit: Number(tahunTerbit),
      stok: Number(stok),
      idKategori: Number(idKategori),
      idRak: Number(idRak)
    });

    return res.status(201).json({
      message: 'Buku berhasil ditambahkan'
    });

  } catch (err) {
    return next(err);
  }
}

// ======================================
// GET ALL BUKU
// ======================================
export async function getAllBuku(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const keyword = String(req.query.q ?? '');

    const sortDir = String(
      req.query.sortDir ?? 'asc'
    ).toLowerCase();

    const conditions = keyword
      ? like(buku.judul, `%${keyword}%`)
      : undefined;

    const rows = await db
      .select({
        id: buku.id,
        judul: buku.judul,
        penulis: buku.penulis,
        stok: buku.stok,

        kategori: {
          id: kategoriBuku.id,
          namaKategori: kategoriBuku.namaKategori
        },

        rak: {
          id: rak.id,
          kodeRak: rak.kodeRak
        }
      })
      .from(buku)
      .innerJoin(
        kategoriBuku,
        eq(buku.idKategori, kategoriBuku.id)
      )
      .innerJoin(
        rak,
        eq(buku.idRak, rak.id)
      )
      .where(conditions)
      .orderBy(
        sortDir === 'desc'
          ? desc(buku.judul)
          : asc(buku.judul)
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const totalResult = await db
      .select({
        total: count()
      })
      .from(buku)
      .where(conditions);

    return res.json({
      rows,
      count: totalResult[0]?.total ?? 0,
      page,
      limit
    });

  } catch (err) {
    return next(err);
  }
}


// ======================================
// GET BUKU BY ID
// ======================================
export async function getBukuById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return next({
        statusCode: 400,
        message: 'id harus berupa angka'
      });
    }

    const result = await db
      .select({
        id: buku.id,
        judul: buku.judul,
        penulis: buku.penulis,
        penerbit: buku.penerbit,
        tahunTerbit: buku.tahunTerbit,
        stok: buku.stok,

        kategori: {
          id: kategoriBuku.id,
          namaKategori: kategoriBuku.namaKategori
        },

        rak: {
          id: rak.id,
          kodeRak: rak.kodeRak
        }
      })
      .from(buku)
      .innerJoin(
        kategoriBuku,
        eq(buku.idKategori, kategoriBuku.id)
      )
      .innerJoin(
        rak,
        eq(buku.idRak, rak.id)
      )
      .where(eq(buku.id, id))
      .limit(1);

    if (!result[0]) {
      return next({
        statusCode: 404,
        message: 'Buku tidak ditemukan'
      });
    }

    return res.json(result[0]);

  } catch (err) {
    return next(err);
  }
}


// ======================================
// UPDATE BUKU
// ======================================
export async function updateBuku(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return next({
        statusCode: 400,
        message: 'id harus berupa angka'
      });
    }

    const existing = await db
      .select()
      .from(buku)
      .where(eq(buku.id, id))
      .limit(1);

    if (!existing[0]) {
      return next({
        statusCode: 404,
        message: 'Buku tidak ditemukan'
      });
    }

    await db
      .update(buku)
      .set(req.body)
      .where(eq(buku.id, id));

    return res.json({
      message: 'Buku berhasil diperbarui'
    });

  } catch (err) {
    return next(err);
  }
}


// ======================================
// DELETE BUKU
// ======================================
export async function deleteBuku(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return next({
        statusCode: 400,
        message: 'id harus berupa angka'
      });
    }

    const existing = await db
      .select()
      .from(buku)
      .where(eq(buku.id, id))
      .limit(1);

    if (!existing[0]) {
      return next({
        statusCode: 404,
        message: 'Buku tidak ditemukan'
      });
    }

    await db
      .delete(buku)
      .where(eq(buku.id, id));

    return res.json({
      message: 'Buku berhasil dihapus'
    });

  } catch (err) {
    return next(err);
  }
}