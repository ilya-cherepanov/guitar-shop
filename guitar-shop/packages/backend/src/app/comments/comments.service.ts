import { Injectable } from '@nestjs/common';
import { MAX_COMMENTS_COUNT } from '../constants';
import { CommentRepository } from './comment.repository';
import { CreateCommentDTO } from './dto/create-comment.dto';


@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
  ) {}

  public async getLast(productId: number) {
    return this.commentRepository.findLast(productId, MAX_COMMENTS_COUNT);
  }

  public async create(productId: number, userId: number, dto: CreateCommentDTO) {
    return this.commentRepository.create(productId, userId, dto);
  }
}
