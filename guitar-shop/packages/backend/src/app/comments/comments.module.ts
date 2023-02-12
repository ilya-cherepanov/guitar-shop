import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CommentRepository } from './comment.repository';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
  ],
  providers: [CommentsService, CommentRepository],
  controllers: [CommentsController],
})
export class CommentsModule {}
