import { Post, Metadata } from '@prisma/client';

export interface IAuthor {
  id: number;
  name: string;
  email: string;
  password: string;
  bio: string | null;  
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
  metadata?: Metadata | null;  
}

export interface IAuthorCreate {
  name: string;
  email: string;
  password: string;
  bio?: string | null;  
}

export interface IAuthorUpdate {
  name?: string;
  email?: string;
  password?: string;
  bio?: string | null; 
}