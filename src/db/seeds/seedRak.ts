import { db } from '../index.js';
import { rak } from '../rak.js';

async function seedRak() {

  await db.insert(rak).values([
    {
      kodeRak: 'A-01',
      lokasi: 'Lantai 1'
    },
    {
      kodeRak: 'A-02',
      lokasi: 'Lantai 1'
    },
    {
      kodeRak: 'B-01',
      lokasi: 'Lantai 2'
    },
    {
      kodeRak: 'B-02',
      lokasi: 'Lantai 2'
    },
    {
      kodeRak: 'C-01',
      lokasi: 'Lantai 3'
    }
  ]);

  console.log('Seed rak berhasil');
}

seedRak();