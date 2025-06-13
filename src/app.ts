import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';

// Configuração do servidor
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
import authorRouter from '@controllers/author.controller';
import postRouter from '@controllers/post.controller';
import metadataRouter from '@controllers/metadata.controller';

app.use('/api/authors', authorRouter);
app.use('/api/posts', postRouter);
app.use('/api/metadata', metadataRouter);

// Health Check
app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'OK' });
});

// 404 Handler
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not found' });
});

// Error Handler
import errorHandler from '@middlewares/error.middleware';
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
});

// Tratamento de encerramento
process.on('SIGINT', () => {
  console.log('\n🔴 Servidor encerrado');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🔴 Servidor finalizado');
  process.exit(0);
});

export default app;