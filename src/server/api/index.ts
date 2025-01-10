import express from 'express';
import { newsRouter } from './news.js';

const apiRouter = express.Router();

// Rotas da API
apiRouter.use('/news', newsRouter);

export { apiRouter }; 