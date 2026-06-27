import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

import * as users from './users.js';
import * as buku from './buku.js';
import * as kategoriBuku from './kategori.js';
import * as rak from './rak.js';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'sistem_informasi_perpus',
  connectionLimit: 10
});

const schema = {
  ...users,
  ...buku,
  ...kategoriBuku,
  ...rak
};

export const db = drizzle(pool, {
  schema,
  mode: 'default'
});