import {
  int,
  mysqlTable,
  varchar
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),
  nama: varchar('nama', {length: 100}).notNull(),
  email: varchar('email', {length: 100}).notNull().unique(),
  password: varchar('password', {length: 255}).notNull()
});