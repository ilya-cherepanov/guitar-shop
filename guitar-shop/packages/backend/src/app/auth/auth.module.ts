import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../../config/jwt.config';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JWTAdminStrategy } from './strategies/jwt-admin.strategy';


@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [AuthService, UserRepository, JWTStrategy, JWTAdminStrategy],
  controllers: [AuthController],
  exports: [JWTStrategy],
})
export class AuthModule {}
