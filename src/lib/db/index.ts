import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

console.log('📂 Conectando ao banco de dados Postgres...');

export const db = drizzle(sql, { schema });