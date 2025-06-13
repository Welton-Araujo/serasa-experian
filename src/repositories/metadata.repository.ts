import prisma from '@config/prisma';
import { IMetadata, IMetadataCreate, IMetadataUpdate } from '@interfaces/metadata.interface';

export default class MetadataRepository {
  async findByPostId(postId: number): Promise<IMetadata | null> {
    return prisma.metadata.findUnique({ where: { postId } });
  }

  async findByAuthorId(authorId: number): Promise<IMetadata | null> {
    return prisma.metadata.findUnique({ where: { authorId } });
  }

  async create(data: IMetadataCreate): Promise<IMetadata> {
    return prisma.metadata.create({ data });
  }

  async update(id: number, data: IMetadataUpdate): Promise<IMetadata> {
    return prisma.metadata.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<IMetadata> {
    return prisma.metadata.delete({ where: { id } });
  }
}