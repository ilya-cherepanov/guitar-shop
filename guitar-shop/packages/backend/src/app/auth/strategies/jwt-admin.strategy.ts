import { JWTPayload, UserRole } from '@guitar-shop/shared-types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { USER_MUST_BE_ADMIN } from '../../constants';


@Injectable()
export class JWTAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    if (payload.role !== UserRole.Admin) {
      throw new UnauthorizedException(USER_MUST_BE_ADMIN);
    }

    return payload;
  }
}
