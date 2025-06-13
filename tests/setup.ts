import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import app from '../src/app'; // ou '@root/app' se tiver alias
import supertest from 'supertest';
import { mockDeep } from 'jest-mock-extended';

// Carrega as variáveis do .env.test
dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();
const request = supertest(app);

// Conecta e limpa antes dos testes
beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

export { request, prisma };
