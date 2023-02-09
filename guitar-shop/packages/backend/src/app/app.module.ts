import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtOptions } from '../config/jwt.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ENV_FILE_PATH } from './constants';
import envSchema from './env.schema';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_FILE_PATH,
      validationSchema: envSchema,
      load: [
        jwtOptions,
      ]
    }),
    PrismaModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
