import { int, mysqlTable,varchar } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { buku } from './buku.js';

export const rak = mysqlTable('rak', {
  id: int('id').autoincrement().primaryKey(),
  kodeRak: varchar('kode_rak', {
    length: 20
  }).notNull(),
  lokasi: varchar('lokasi', {
    length: 100
  }).notNull()
});

export const rakRelations = relations(
  rak,
  ({ many }) => ({
    buku: many(buku)
  })
);