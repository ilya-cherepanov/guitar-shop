import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { getUploadFilesConfig } from '../../config/upload-files.config';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductRepository } from './product.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';


@Module({
  imports: [
    PrismaModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getUploadFilesConfig,
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ([{
        rootPath: configService.get<string>('upload.directory'),
        serveRoot: '/static',
      }]),
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
})
export class ProductsModule {}
