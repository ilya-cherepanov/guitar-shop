import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { Name, Password } from '../../constants';


export class RegisterUserDTO {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'valera',
  })
  @Length(Name.MinLength, Name.MaxLength)
  @IsString()
  name: string;

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
  @Length(Password.MinLength, Password.MaxLength)
  @IsString()
  password: string;
}
