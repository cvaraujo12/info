import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('Configurando o projeto...');

  // Criar diretório do banco de dados se não existir
  if (!fs.existsSync('drizzle')) {
    fs.mkdirSync('drizzle');
  }

  // Gerar migrações do banco de dados
  console.log('Gerando migrações...');
  execSync('npm run db:generate', { stdio: 'inherit' });

  // Executar migrações
  console.log('Executando migrações...');
  execSync('npm run db:migrate', { stdio: 'inherit' });

  console.log('Configuração concluída!');
}

main().catch(console.error); 