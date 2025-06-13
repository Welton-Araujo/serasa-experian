import { PrismaClient } from '@prisma/client';
import app from '../src/app';
import supertest from 'supertest';

const prisma = new PrismaClient();
const request = supertest(app);

beforeAll(async () => {
  await prisma.$connect();
  // Limpar dados de teste antes de começar
  await prisma.metadata.deleteMany();
  await prisma.post.deleteMany();
  await prisma.author.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

export { request, prisma };