import { CreateCommentRequest } from '@guitar-shop/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';
import { CommentAdvantages, CommentDisadvantages, CommentRating, CommentText } from '../../constants';


export class CreateCommentDTO implements CreateCommentRequest {
  @ApiProperty({
    description: 'Достоинства товара',
    example: 'Хороший корпус, чистый звук, стурны хорошего качества',
  })
  @Length(CommentAdvantages.MinLength, CommentAdvantages.MaxLength)
  @IsString()
  advantages: string;

  @ApiProperty({
    description: 'Недостатки товара',
    example: 'Тугие колки',
  })
  @Length(CommentDisadvantages.MinLength, CommentDisadvantages.MaxLength)
  @IsString()
  disadvantages: string;

  @ApiProperty({
    description: 'Комментарий',
    example: 'У гитары отличный цвет, хороше дерево. Тяжелая, в комплекте нет чехла и ремня.',
  })
  @Length(CommentText.MinLength, CommentText.MaxLength)
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Оценка товара',
    example: 5,
    minimum: CommentRating.Min,
    maximum: CommentRating.Max,
  })
  @Max(CommentRating.Max)
  @Min(CommentRating.Min)
  @IsInt()
  rating: number;
}
