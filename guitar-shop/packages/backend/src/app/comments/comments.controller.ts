import { fillObject } from '@guitar-shop/core';
import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CommentRDO } from './rdo/comment.rdo';


@ApiTags('Comments')
@Controller()
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  @ApiResponse({
    description: 'Создает новый комментарий к товару',
    type: CommentRDO,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'Не найден товар с данным ID',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Пользователь не аутентифицирован',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiBearerAuth()
  @Post('products/:id/comments')
  @UseGuards(JWTAuthGuard)
  async create(
    @Param('id', ParseIntPipe) productId: number,
    @Req() request: Express.Request,
    @Body() dto: CreateCommentDTO) {
      return fillObject(CommentRDO, await this.commentsService.create(productId, request.user['id'], dto));
  }

  @Get('products/:id/comments')
  @ApiResponse({
    description: 'Получает последние комментарии к товару',
    type: [CommentRDO],
    status: HttpStatus.OK
  })
  async get(@Param('id', ParseIntPipe) productId: number) {
    return fillObject(CommentRDO, await this.commentsService.getLast(productId));
  }
}
