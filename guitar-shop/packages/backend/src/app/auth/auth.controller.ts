import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { fillObject } from '@guitar-shop/core';
import { UserRDO } from './rdo/user.rdo';
import { UserTokenRDO } from './rdo/user-token.rdo';
import { LoginUserDTO } from './dto/login-user.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  @ApiResponse({
    type: UserTokenRDO,
    status: HttpStatus.CREATED,
    description: 'Регистрирует нового пользователя',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Введены не валидные данные'
  })
  async register(@Body() dto: RegisterUserDTO) {
    return fillObject(UserTokenRDO, await this.authService.register(dto));
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserTokenRDO,
    status: HttpStatus.OK,
    description: 'Аутентифицирует пользователя',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Введены не валидные данные'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Введен неверно email или пароль'
  })
  async login(@Body() dto: LoginUserDTO) {
    return fillObject(UserTokenRDO, await this.authService.login(dto));
  }

  @Get('/user')
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: 'Возвращает подробную информацию о пользователе',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Не найден пользователь с таким id'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Неверный или истекший access токен'
  })
  async get(@Req() request: Express.Request) {
    return fillObject(UserRDO, await this.authService.get(request.user['id']));
  }
}
