import { StatusCodes } from 'http-status-codes';
import MetadataRepository from '@repositories/metadata.repository';
import AuthorRepository from '@repositories/author.repository';
import PostRepository from '@repositories/post.repository';
import { IMetadata, IMetadataCreate, IMetadataUpdate } from '@interfaces/metadata.interface';
import ApiError from '@utils/api-error';

export default class MetadataService {
  private metadataRepository: MetadataRepository;
  private authorRepository: AuthorRepository;
  private postRepository: PostRepository;

  constructor() {
    this.metadataRepository = new MetadataRepository();
    this.authorRepository = new AuthorRepository();
    this.postRepository = new PostRepository();
  }

  async getPostMetadata(postId: number): Promise<IMetadata> {
    const metadata = await this.metadataRepository.findByPostId(postId);
    if (!metadata) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Metadata not found for this post');
    }
    return metadata;
  }

  async getAuthorMetadata(authorId: number): Promise<IMetadata> {
    const metadata = await this.metadataRepository.findByAuthorId(authorId);
    if (!metadata) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Metadata not found for this author');
    }
    return metadata;
  }

  async createMetadata(metadataData: IMetadataCreate): Promise<IMetadata> {
    if (metadataData.postId) {
      const post = await this.postRepository.findById(metadataData.postId);
      if (!post) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
      }
    }

    if (metadataData.authorId) {
      const author = await this.authorRepository.findById(metadataData.authorId);
      if (!author) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Author not found');
      }
    }

    return this.metadataRepository.create(metadataData);
  }

  async updateMetadata(id: number, metadataData: IMetadataUpdate): Promise<IMetadata> {
    const metadata = await this.metadataRepository.findByPostId(id) || 
                    await this.metadataRepository.findByAuthorId(id);
    
    if (!metadata) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Metadata not found');
    }

    return this.metadataRepository.update(metadata.id, metadataData);
  }

  async deleteMetadata(id: number): Promise<IMetadata> {
    const metadata = await this.metadataRepository.findByPostId(id) || 
                    await this.metadataRepository.findByAuthorId(id);
    
    if (!metadata) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Metadata not found');
    }

    return this.metadataRepository.delete(metadata.id);
  }
}