import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { uploadFilesOptions } from '../../config/upload-files.config';
import { ENV_FILE_PATH } from '../constants';
import envSchema from '../env.schema';
import { GenerateCommand } from './commands/generate.command';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_FILE_PATH,
      validationSchema: envSchema,
      load: [uploadFilesOptions],
    }),
  ],
  providers: [GenerateCommand],
})
export class CliModule {}
