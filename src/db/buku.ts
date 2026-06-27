import {int,mysqlTable,varchar } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { kategoriBuku } from './kategori.js';
import { rak } from './rak.js';

export const buku = mysqlTable('buku', {
  id: int('id').autoincrement().primaryKey(),
  judul: varchar('judul', {
    length: 200
  }).notNull(),
  penulis: varchar('penulis', {
    length: 100
  }).notNull(),
  penerbit: varchar('penerbit', {
    length: 100
  }).notNull(),
  tahunTerbit: int('tahun_terbit').notNull(),
  stok: int('stok').notNull(),
  idKategori: int('id_kategori')
    .notNull()
    .references(() => kategoriBuku.id),
  idRak: int('id_rak')
    .notNull()
    .references(() => rak.id)
});

export const bukuRelations = relations(
  buku,
  ({ one }) => ({
    kategori: one(kategoriBuku, {
      fields: [buku.idKategori],
      references: [kategoriBuku.id]
    }),

    rak: one(rak, {
      fields: [buku.idRak],
      references: [rak.id]
    })
  })
);