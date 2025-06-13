import { Author, Metadata } from '@prisma/client';

export interface IPost {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author?: Author;       
  metadata?: Metadata | null;  
}

export interface IPostCreate {
  title: string;
  content: string;
  published?: boolean;
  authorId: number;
}

export interface IPostUpdate {
  title?: string;
  content?: string;
  published?: boolean;
  authorId?: number;
}