import { LoginUserRequest } from '@guitar-shop/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { Password } from '../../constants';


export class LoginUserDTO implements LoginUserRequest {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'valera@mail.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'pass1234',
  })
  @Length(Password.LoginMinLength, Password.MaxLength)
  @IsString()
  password: string;
}
