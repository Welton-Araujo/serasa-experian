import prisma from '@config/prisma';
import { IAuthor, IAuthorCreate, IAuthorUpdate } from '@interfaces/author.interface';
import { PaginationOptions, PaginationResult } from '@dtos/pagination.dto';

export default class AuthorRepository {
 async findAll({ page, limit }: PaginationOptions): Promise<PaginationResult<IAuthor>> {
  const [total, data] = await prisma.$transaction([
    prisma.author.count(),
    prisma.author.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { posts: true, metadata: true }, 
    }),
  ]);

  return {
    data: data as IAuthor[], 
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

  async findById(id: number): Promise<IAuthor | null> {
    return prisma.author.findUnique({
      where: { id },
      include: { posts: true, metadata: true },
    });
  }

  async findByEmail(email: string): Promise<IAuthor | null> {
    return prisma.author.findUnique({ where: { email } });
  }

  async create(data: IAuthorCreate): Promise<IAuthor> {
    return prisma.author.create({ data });
  }

  async update(id: number, data: IAuthorUpdate): Promise<IAuthor> {
    return prisma.author.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<IAuthor> {
    return prisma.author.delete({ where: { id } });
  }
}