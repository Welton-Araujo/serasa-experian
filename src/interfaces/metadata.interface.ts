export interface IMetadata {
  id: number;
  postId: number | null;  
  authorId: number | null; 
  keywords: string[];
  seoTitle: string | null;
  seoDesc: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMetadataCreate {
  postId?: number | null;
  authorId?: number | null;
  keywords: string[];
  seoTitle?: string | null;
  seoDesc?: string | null;
}

export interface IMetadataUpdate {
  keywords?: string[];
  seoTitle?: string | null;
  seoDesc?: string | null;
}