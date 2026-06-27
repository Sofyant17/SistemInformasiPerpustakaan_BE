// import bcrypt from 'bcrypt';
import { db } from '../index.js';
import { users } from '../users.js';

async function seedUsers() {
  // const password = await bcrypt.hash('admin123', 10);
  await db.insert(users).values([
    {
      nama: 'Admi',
      email: 'admin@perpus.com',
      password: '121212'
    }
  ]);

  console.log('Seed users berhasil');
}

seedUsers();