import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { db } from '../db';

const runMigrations = async () => {
  try {
    console.log('🔄 Iniciando migrações...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrações concluídas com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante as migrações:', error);
    process.exit(1);
  }
};

void runMigrations();