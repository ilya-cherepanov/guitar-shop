import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtOptions } from '../config/jwt.config';
import { uploadFilesOptions } from '../config/upload-files.config';
import { AuthModule } from './auth/auth.module';
import { ENV_FILE_PATH } from './constants';
import envSchema from './env.schema';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from './mail/mail.module';
import { mailOptions } from '../config/mail.config';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_FILE_PATH,
      validationSchema: envSchema,
      load: [jwtOptions, uploadFilesOptions, mailOptions],
    }),
    PrismaModule,
    AuthModule,
    ProductsModule,
    CommentsModule,
    MailModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
