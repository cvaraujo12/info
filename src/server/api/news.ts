import express from 'express';
import { db } from '../../lib/db';
import { eq, desc } from 'drizzle-orm';
import { news } from '../../lib/db/schema';

const newsRouter = express.Router();

interface NewsResponse {
  id: number;
  title: string;
  content: string;
  summary: string;
  imageUrl: string | null;
  source: string | null;
  publishedAt: number;
  category: string;
  createdAt: number;
}

// Função para validar se um objeto é do tipo NewsResponse
function isValidNewsResponse(data: any): data is NewsResponse {
  return (
    typeof data.id === 'number' &&
    typeof data.title === 'string' &&
    typeof data.content === 'string' &&
    typeof data.summary === 'string' &&
    (typeof data.imageUrl === 'string' || data.imageUrl === null) &&
    (typeof data.source === 'string' || data.source === null) &&
    typeof data.publishedAt === 'number' &&
    typeof data.category === 'string' &&
    typeof data.createdAt === 'number'
  );
}

// GET /api/news - Retorna todas as notícias
newsRouter.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Pega os parâmetros de paginação
  const offset = (Number(page) - 1) * Number(limit); // Calcula o offset

  console.log('📬 Buscando todas as notícias...');
  try {
    console.log('🔍 Executando query no banco de dados...');
    const dbResults = await db
      .select({
        id: news.id,
        title: news.title,
        content: news.content,
        summary: news.summary,
        imageUrl: news.imageUrl,
        source: news.source,
        publishedAt: news.publishedAt,
        category: news.category,
        createdAt: news.createdAt
      })
      .from(news)
      .orderBy(desc(news.publishedAt))
      .limit(Number(limit)) // Limita o número de resultados
      .offset(offset); // Aplica o offset

    const results = dbResults as unknown as any[]; // Mantém como any para validação
    const validResults = results.filter(isValidNewsResponse); // Filtra resultados válidos

    console.log(`✅ ${validResults.length} notícias encontradas`);
    res.json({
      success: true,
      count: validResults.length,
      data: validResults
    });
  } catch (error) {
    console.error('❌ Erro ao buscar notícias:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// GET /api/news/:id - Retorna uma notícia específica
newsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`📬 Buscando notícia ${id}...`);
  try {
    console.log('🔍 Executando query no banco de dados...');
    const dbResults = await db
      .select({
        id: news.id,
        title: news.title,
        content: news.content,
        summary: news.summary,
        imageUrl: news.imageUrl,
        source: news.source,
        publishedAt: news.publishedAt,
        category: news.category,
        createdAt: news.createdAt
      })
      .from(news)
      .where(eq(news.id, parseInt(id)))
      .limit(1);
    
    const results = dbResults as unknown as any[];
    const validResults = results.filter(isValidNewsResponse);

    if (!validResults.length) {
      console.log('❌ Notícia não encontrada');
      return res.status(404).json({
        success: false,
        error: 'Notícia não encontrada'
      });
    }
    
    console.log('✅ Notícia encontrada');
    res.json({
      success: true,
      data: validResults[0]
    });
  } catch (error) {
    console.error('❌ Erro ao buscar notícia:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

export { newsRouter }; 