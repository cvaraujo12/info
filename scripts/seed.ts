import { db } from '../src/lib/db';
import { news, statistics, projects, routes, analysis } from '../src/lib/db/schema';

// Importando os dados
import { newsData } from './data/news';
import { statisticsData } from './data/statistics';
import { projectsData } from './data/projects';
import { routesData } from './data/routes';
import { analysisData } from './data/analysis';

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...');

  try {
    // Limpando dados existentes
    await db.delete(news);
    await db.delete(statistics);
    await db.delete(projects);
    await db.delete(routes);
    await db.delete(analysis);

    console.log('✨ Banco de dados limpo');

    // Inserindo novos dados
    if (newsData.length > 0) {
      await db.insert(news).values(newsData);
      console.log(`📰 ${newsData.length} notícias inseridas`);
    }

    if (statisticsData.length > 0) {
      await db.insert(statistics).values(statisticsData);
      console.log(`📊 ${statisticsData.length} estatísticas inseridas`);
    }

    if (projectsData.length > 0) {
      await db.insert(projects).values(projectsData);
      console.log(`🏗️ ${projectsData.length} projetos inseridos`);
    }

    if (routesData.length > 0) {
      await db.insert(routes).values(routesData);
      console.log(`🛣️ ${routesData.length} rotas inseridas`);
    }

    if (analysisData.length > 0) {
      await db.insert(analysis).values(analysisData);
      console.log(`📝 ${analysisData.length} análises inseridas`);
    }

    console.log('✅ Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    process.exit(1);
  }
}

seed(); 