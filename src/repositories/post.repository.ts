import prisma from '@config/prisma';
import { IPost, IPostCreate, IPostUpdate } from '@interfaces/post.interface';
import { PaginationOptions, PaginationResult } from '@dtos/pagination.dto';

export default class PostRepository {
  async findAll({ page, limit }: PaginationOptions): Promise<PaginationResult<IPost>> {
  const [total, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { 
        author: true,
        metadata: true 
      },
    }),
  ]);

  return {
    data: data as unknown as IPost[],
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

  async findById(id: number): Promise<IPost | null> {
    return prisma.post.findUnique({
      where: { id },
      include: { author: true, metadata: true },
    });
  }

  async findByAuthor(authorId: number, { page, limit }: PaginationOptions): Promise<PaginationResult<IPost>> {
    const [total, data] = await prisma.$transaction([
      prisma.post.count({ where: { authorId } }),
      prisma.post.findMany({
        where: { authorId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { author: true, metadata: true },
      }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(data: IPostCreate): Promise<IPost> {
    return prisma.post.create({
      data,
      include: { author: true, metadata: true },
    });
  }

  async update(id: number, data: IPostUpdate): Promise<IPost> {
    return prisma.post.update({
      where: { id },
      data,
      include: { author: true, metadata: true },
    });
  }

  async delete(id: number): Promise<IPost> {
    return prisma.post.delete({ where: { id } });
  }
}
