import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Comment, CommentContent } from '@guitar-shop/shared-types';
import { PRODUCT_NOT_FOUND } from '../constants';


@Injectable()
export class CommentRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  public async findLast(productId: number, quantity: number): Promise<Comment[]> {
    const comments = await this.prismaService.comment.findMany({
      where: {productId},
      include: {
        author: true,
      },
      take: quantity,
      orderBy: {
        createdAt: 'desc',
      }
    });

    return comments;
  }

  public async create(productId: number, userId: number, commentContent: CommentContent): Promise<Comment> {
    const existingProduct = await this.prismaService.product.findFirst({where: {id: productId}});

    if (!existingProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    const newComment = await this.prismaService.comment.create({
      data: {
        ...commentContent,
        productId,
        authorId: userId,
      },
      include: {
        author: true,
      }
    });

    const commentAggregations = await this.prismaService.comment.aggregate({
      where: {
        productId,
      },
      _avg: {
        rating: true,
      }
    });

    await this.prismaService.product.update({
      where: {id: productId},
      data: {
        avgRating: commentAggregations._avg.rating,
      },
    });

    return newComment;
  }
}
