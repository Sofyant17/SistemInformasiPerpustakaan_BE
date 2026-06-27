import type {Request,Response,NextFunction} from 'express';
import {asc,desc,count,eq,like} from 'drizzle-orm';
import { db } from '../db/index.js';
import { kategoriBuku } from '../db/schema.js';


// CREATE
export async function createKategori(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const { namaKategori } = req.body;

    if (!namaKategori) {
      return next({
        statusCode: 400,
        message: 'Nama kategori wajib diisi'
      });
    }

    await db.insert(kategoriBuku).values({
      namaKategori
    });

    return res.status(201).json({
      message: 'Kategori berhasil ditambahkan'
    });

  } catch (err) {
    return next(err);
  }
}


// GET ALL
export async function getAllKategori(
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
      ? like(
          kategoriBuku.namaKategori,
          `%${keyword}%`
        )
      : undefined;

    const rows = await db
      .select()
      .from(kategoriBuku)
      .where(conditions)
      .orderBy(
        sortDir === 'desc'
          ? desc(kategoriBuku.namaKategori)
          : asc(kategoriBuku.namaKategori)
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const totalResult = await db
      .select({
        total: count()
      })
      .from(kategoriBuku)
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


// GET BY ID
export async function getKategoriById(
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
      .select()
      .from(kategoriBuku)
      .where(eq(kategoriBuku.id, id))
      .limit(1);

    if (!result[0]) {
      return next({
        statusCode: 404,
        message: 'Kategori tidak ditemukan'
      });
    }

    return res.json(result[0]);

  } catch (err) {
    return next(err);
  }
}


// UPDATE
export async function updateKategori(
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

    const { namaKategori } = req.body;

    if (!namaKategori) {
      return next({
        statusCode: 400,
        message: 'Nama kategori wajib diisi'
      });
    }

    const existing = await db
      .select()
      .from(kategoriBuku)
      .where(eq(kategoriBuku.id, id))
      .limit(1);

    if (!existing[0]) {
      return next({
        statusCode: 404,
        message: 'Kategori tidak ditemukan'
      });
    }

    await db
      .update(kategoriBuku)
      .set({
        namaKategori
      })
      .where(eq(kategoriBuku.id, id));

    return res.json({
      message: 'Kategori berhasil diperbarui'
    });

  } catch (err) {
    return next(err);
  }
}


// DELETE
export async function deleteKategori(
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
      .from(kategoriBuku)
      .where(eq(kategoriBuku.id, id))
      .limit(1);

    if (!existing[0]) {
      return next({
        statusCode: 404,
        message: 'Kategori tidak ditemukan'
      });
    }

    await db
      .delete(kategoriBuku)
      .where(eq(kategoriBuku.id, id));

    return res.json({
      message: 'Kategori berhasil dihapus'
    });

  } catch (err) {
    return next(err);
  }
}