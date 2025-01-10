import express from 'express';
import { db } from '../../lib/db';
import { statistics } from '../../lib/db/schema';
import { redis } from '../../lib/redis';

const statisticsRouter = express.Router();

// Cache middleware
const cacheMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const key = `cache:${req.originalUrl}`;
  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      console.log('🎯 Cache hit:', key);
      return res.json(JSON.parse(cachedData));
    }
    console.log('❌ Cache miss:', key);
    next();
  } catch (error) {
    console.error('❌ Erro no cache:', error);
    next();
  }
};

// Listar todas as estatísticas
statisticsRouter.get('/', cacheMiddleware, async (req, res) => {
  try {
    console.log('📊 Buscando estatísticas...');
    const result = await db.select({
      id: statistics.id,
      country: statistics.country,
      year: statistics.year,
      investment: statistics.investment,
      projectCount: statistics.projectCount,
      tradeVolume: statistics.tradeVolume,
      gdpImpact: statistics.gdpImpact,
      employmentImpact: statistics.employmentImpact,
      createdAt: statistics.createdAt
    }).from(statistics);
    
    console.log(`✅ ${result.length} estatísticas encontradas`);
    await redis.set(`cache:${req.originalUrl}`, JSON.stringify(result), 'EX', 300);
    res.json(result);
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export { statisticsRouter }; 