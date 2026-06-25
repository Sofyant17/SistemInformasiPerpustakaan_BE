import {
    int,
    mysqTable,
    varchar
} from 'drizzle-orm/mysql-core';
import mysqlCore = require('drizzle-orm/mysql-core');

// user(login petugas)
export const users = mysqTable('users', {
    id: int('id').autoincrement().primarykey(),
    nama: varchar('nama', { length: 100}).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull()
});

// kategori buku
export const kategoriBuku = mysqlTable('kategori_buku', {
  id: int('id').autoincrement().primaryKey(),
  namaKategori: varchar('nama_kategori', {
    length: 100
  }).notNull()
});

// tabel rak
export const rak = mysqlTable('rak', {
  id: int('id').autoincrement().primaryKey(),
  kodeRak: varchar('kode_rak', {
    length: 20
  }).notNull(),

  lokasi: varchar('lokasi', {
    length: 100
  }).notNull()
});

// buku
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

  idKategori: int('id_kategori').notNull(),

  idRak: int('id_rak').notNull()
});