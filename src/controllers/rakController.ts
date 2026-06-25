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
import { rak } from '../db/schema.js';


// CREATE
export async function createRak(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const { kodeRak, lokasi } = req.body;

    if (!kodeRak || !lokasi) {
      return next({
        statusCode: 400,
        message: 'Kode rak dan lokasi wajib diisi'
      });
    }

    await db.insert(rak).values({
      kodeRak,
      lokasi
    });

    return res.status(201).json({
      message: 'Rak berhasil ditambahkan'
    });

  } catch (err) {
    return next(err);
  }
}


// GET ALL
export async function getAllRak(
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
      ? like(rak.kodeRak, `%${keyword}%`)
      : undefined;

    const rows = await db
      .select()
      .from(rak)
      .where(conditions)
      .orderBy(
        sortDir === 'desc'
          ? desc(rak.kodeRak)
          : asc(rak.kodeRak)
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const totalResult = await db
      .select({
        total: count()
      })
      .from(rak)
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
export async function getRakById(
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
      .from(rak)
      .where(eq(rak.id, id))
      .limit(1);

    if (!result[0]) {
      return next({
        statusCode: 404,
        message: 'Rak tidak ditemukan'
      });
    }

    return res.json(result[0]);

  } catch (err) {
    return next(err);
  }
}


// UPDATE
export async function updateRak(
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

    const { kodeRak, lokasi } = req.body;

    if (!kodeRak || !lokasi) {
      return next({
        statusCode: 400,
        message: 'Kode rak dan lokasi wajib diisi'
      });
    }

    const existing = await db
      .select()
      .from(rak)
      .where(eq(rak.id, id))
      .limit(1);

    if (!existing[0]) {
      return next({
        statusCode: 404,
        message: 'Rak tidak ditemukan'
      });
    }

    await db
      .update(rak)
      .set({
        kodeRak,
        lokasi
      })
      .where(eq(rak.id, id));

    return res.json({
      message: 'Rak berhasil diperbarui'
    });

  } catch (err) {
    return next(err);
  }
}


// DELETE
export async function deleteRak(
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
      .from(rak)
      .where(eq(rak.id, id))
      .limit(1);

    if (!existing[0]) {
      return next({
        statusCode: 404,
        message: 'Rak tidak ditemukan'
      });
    }

    await db
      .delete(rak)
      .where(eq(rak.id, id));

    return res.json({
      message: 'Rak berhasil dihapus'
    });

  } catch (err) {
    return next(err);
  }
}