import { StatusCodes } from 'http-status-codes';
import PostRepository from '@repositories/post.repository';
import AuthorRepository from '@repositories/author.repository';
import { IPost, IPostCreate, IPostUpdate } from '@interfaces/post.interface';
import { PaginationOptions, PaginationResult } from '@dtos/pagination.dto';
import ApiError from '@utils/api-error';

export default class PostService {
  private postRepository: PostRepository;
  private authorRepository: AuthorRepository;

  constructor() {
    this.postRepository = new PostRepository();
    this.authorRepository = new AuthorRepository();
  }

  async getAllPosts(options: PaginationOptions): Promise<PaginationResult<IPost>> {
    return this.postRepository.findAll(options);
  }

  async getPostsByAuthor(authorId: number, options: PaginationOptions): Promise<PaginationResult<IPost>> {
    const author = await this.authorRepository.findById(authorId);
    if (!author) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Author not found');
    }
    return this.postRepository.findByAuthor(authorId, options);
  }

  async getPostById(id: number): Promise<IPost> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
    }
    return post;
  }

  async createPost(postData: IPostCreate): Promise<IPost> {
    const author = await this.authorRepository.findById(postData.authorId);
    if (!author) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Author not found');
    }
    return this.postRepository.create(postData);
  }

  async updatePost(id: number, postData: IPostUpdate): Promise<IPost> {
    await this.getPostById(id);
    if (postData.authorId) {
      const author = await this.authorRepository.findById(postData.authorId);
      if (!author) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Author not found');
      }
    }
    return this.postRepository.update(id, postData);
  }

  async deletePost(id: number): Promise<IPost> {
    await this.getPostById(id);
    return this.postRepository.delete(id);
  }
}