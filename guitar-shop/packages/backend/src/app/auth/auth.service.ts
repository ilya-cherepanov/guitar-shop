import { JWTPayload, UserRole } from '@guitar-shop/shared-types';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH_NOT_VALID, AUTH_USER_NOT_FOUND } from '../constants';
import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: RegisterUserDTO) {
    const newUserEntity = await (new UserEntity({
      ...dto,
      password: '',
      role: UserRole.Customer,
    })).setPassword(dto.password);

    const newUser = await this.userRepository.create(newUserEntity);
    return this.getToken({
      id: newUser.id,
      role: newUser.role,
    });
  }

  public async login(dto: LoginUserDTO) {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (!existingUser) {
      throw new UnauthorizedException(AUTH_NOT_VALID);
    }

    const existingUserEntity = new UserEntity(existingUser);
    if (!await existingUserEntity.checkPassword(dto.password)) {
      throw new UnauthorizedException(AUTH_NOT_VALID);
    }

    return this.getToken({
      id: existingUserEntity.id,
      role: existingUserEntity.role,
    });
  }

  public async get(userId: number) {
    const existingUser = await this.userRepository.findById(userId);

    if (!existingUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return existingUser;
  }

  private async getToken(payload: JWTPayload) {
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
