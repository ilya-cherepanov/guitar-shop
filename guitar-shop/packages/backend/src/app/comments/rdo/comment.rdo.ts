import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CommentRating } from '../../constants';


class CommentAuthorRDO {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: 41,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Valera',
  })
  @Expose()
  name: string;
}


export class CommentRDO {
  @ApiProperty({
    description: 'Уникальный идентификатор комментария',
    example: 523,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Достоинства товара',
    example: 'Хороший корпус, чистый звук, струны хорошего качества',
  })
  @Expose()
  advantages: string;

  @ApiProperty({
    description: 'Недостатки товара',
    example: 'Тугие колки',
  })
  @Expose()
  disadvantages: string;

  @ApiProperty({
    description: 'Комментарий',
    example: 'У гитары отличный цвет, хороше дерево. Тяжелая, в комплекте нет чехла и ремня.',
  })
  @Expose()
  text: string;

  @ApiProperty({
    description: 'Оценка товара',
    example: 5,
    minimum: CommentRating.Min,
    maximum: CommentRating.Max,
  })
  @Expose()
  rating: number;

  @ApiProperty({
    description: 'Дата создания комментария',
    example: '2023-02-09T14:43:11.000Z',
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    description: 'Автор комментария',
    type: CommentAuthorRDO,
  })
  @Expose()
  @Type(() => CommentAuthorRDO)
  author: CommentAuthorRDO;

  @ApiProperty({
    description: 'Идентификатор товара',
    example: 234,
  })
  @Expose()
  productId: number;
}
