// src/interfaces/prisma.types.ts
import { Post, Author, Metadata } from '@prisma/client';

export type PostWithRelations = Post & {
  author: Author;
  metadata: Metadata | null;
};