import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './db/schema';
import path from 'path';

const dbPath = path.resolve(process.cwd(), './data/database.sqlite');
console.log('📂 Conectando ao banco de dados em:', dbPath);

let sqlite: Database.Database;
try {
  sqlite = new Database(dbPath);
  console.log('✅ Conexão com SQLite estabelecida');
} catch (error) {
  console.error('❌ Erro ao conectar com SQLite:', error);
  process.exit(1);
}

export const db = drizzle(sqlite, { schema });
console.log('✅ Drizzle ORM configurado'); 