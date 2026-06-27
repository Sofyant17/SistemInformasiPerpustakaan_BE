import { db } from '../index.js';
import { kategoriBuku } from '../kategori.js';

async function seedKategori() {

  await db.insert(kategoriBuku).values([
    {
      namaKategori: 'Teknologi'
    },
    {
      namaKategori: 'Novel'
    },
    {
      namaKategori: 'Agama'
    },
    {
      namaKategori: 'Sejarah'
    },
    {
      namaKategori: 'Pendidikan'
    }
  ]);

  console.log('Seed kategori berhasil');
}

seedKategori();