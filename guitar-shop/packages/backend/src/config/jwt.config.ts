import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_TOKEN_EXPIRES_IN } from '../app/constants';


export const jwtOptions = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
}));

export async function getJWTConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.secret'),
    signOptions: {expiresIn: JWT_TOKEN_EXPIRES_IN, algorithm: 'HS256'},
  };
}
