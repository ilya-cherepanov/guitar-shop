import { UserResponse, UserRole } from '@guitar-shop/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class UserRDO implements UserResponse {
  @ApiProperty({
    description: 'ID пользователя',
    example: 42,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'valera@email.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'valera@email.com',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: UserRole.Admin,
  })
  @Expose()
  role: string;
}
