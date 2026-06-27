import { db } from '../index.js';
import { buku } from '../buku.js';

async function seedBuku() {

  await db.insert(buku).values([
    {
      judul: 'Belajar JavaScript',
      penulis: 'Andi',
      penerbit: 'Informatika',
      tahunTerbit: 2023,
      stok: 10,
      idKategori: 1,
      idRak: 1
    },
    {
      judul: 'Pemrograman Web',
      penulis: 'Budi',
      penerbit: 'Elex Media',
      tahunTerbit: 2022,
      stok: 5,
      idKategori: 1,
      idRak: 2
    },
    {
      judul: 'Laskar Pelangi',
      penulis: 'Andrea Hirata',
      penerbit: 'Bentang',
      tahunTerbit: 2005,
      stok: 7,
      idKategori: 2,
      idRak: 3
    },
    {
      judul: 'Sejarah Indonesia',
      penulis: 'Slamet Muljana',
      penerbit: 'Balai Pustaka',
      tahunTerbit: 2018,
      stok: 4,
      idKategori: 4,
      idRak: 4
    },
    {
      judul: 'Pendidikan Karakter',
      penulis: 'Muchlas Samani',
      penerbit: 'Rosda',
      tahunTerbit: 2021,
      stok: 8,
      idKategori: 5,
      idRak: 5
    }
  ]);

  console.log('Seed buku berhasil');
}

seedBuku()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeder gagal:', error);
    process.exit(1);
  });