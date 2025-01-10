import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { apiRouter } from './api';

const app = express();
const port = process.env.PORT || 3001;

console.log('🚀 Iniciando servidor...');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Log de requisições
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api', apiRouter);

// Tratamento de erros
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Erro:', err);
  console.error('Stack:', err.stack);
  console.error('Request path:', req.path);
  console.error('Request method:', req.method);
  console.error('Request body:', req.body);
  
  res.status(500).json({ 
    error: err.message,
    path: req.path,
    method: req.method
  });
});

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('❌ Erro não capturado:', error);
  console.error('Stack:', error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada não tratada:', reason);
  console.error('Promise:', promise);
});

// Inicialização do servidor
try {
  app.listen(port, () => {
    console.log(`✅ Servidor rodando em http://localhost:${port}`);
  });
} catch (error) {
  console.error('❌ Erro ao iniciar servidor:', error);
  process.exit(1);
}