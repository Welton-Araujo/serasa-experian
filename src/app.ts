import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';

import authorRouter from '@controllers/author.controller';
import postRouter from '@controllers/post.controller';
import metadataRouter from '@controllers/metadata.controller';
import errorHandler from '@middlewares/error.middleware';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/authors', authorRouter);
app.use('/api/posts', postRouter);
app.use('/api/metadata', metadataRouter);

// Health check
app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'OK' });
});

// 404 handler
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

export default app;