import { StatusCodes } from 'http-status-codes';
import AuthorRepository from '@repositories/author.repository';
import { IAuthor, IAuthorCreate, IAuthorUpdate } from '@interfaces/author.interface';
import { PaginationOptions, PaginationResult } from '@dtos/pagination.dto';
import ApiError from '@utils/api-error';

export default class AuthorService {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  async getAllAuthors(options: PaginationOptions): Promise<PaginationResult<IAuthor>> {
    return this.authorRepository.findAll(options);
  }

  async getAuthorById(id: number): Promise<IAuthor> {
    const author = await this.authorRepository.findById(id);
    if (!author) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Author not found');
    }
    return author;
  }

  async createAuthor(authorData: IAuthorCreate): Promise<IAuthor> {
    const existingAuthor = await this.authorRepository.findByEmail(authorData.email);
    if (existingAuthor) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already in use');
    }
    return this.authorRepository.create(authorData);
  }

  async updateAuthor(id: number, authorData: IAuthorUpdate): Promise<IAuthor> {
    const author = await this.getAuthorById(id);
    if (authorData.email && authorData.email !== author.email) {
      const existingAuthor = await this.authorRepository.findByEmail(authorData.email);
      if (existingAuthor) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already in use');
      }
    }
    return this.authorRepository.update(id, authorData);
  }

  async deleteAuthor(id: number): Promise<IAuthor> {
    await this.getAuthorById(id);
    return this.authorRepository.delete(id);
  }
}