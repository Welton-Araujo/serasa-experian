import { Post, Metadata } from '@prisma/client';

export interface IAuthor {
  id: number;
  name: string;
  email: string;
  password: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
  metadata?: Metadata;
}

export interface IAuthorCreate {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export interface IAuthorUpdate {
  name?: string;
  email?: string;
  password?: string;
  bio?: string;
}