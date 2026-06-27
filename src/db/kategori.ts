import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { buku } from './buku.js';

export const kategoriBuku = mysqlTable('kategori_buku', {
  id: int('id').autoincrement().primaryKey(),
  namaKategori: varchar('nama_kategori', {
    length: 100
  }).notNull()
});

export const kategoriRelations = relations(
  kategoriBuku,
  ({ many }) => ({
    buku: many(buku)
  })
);