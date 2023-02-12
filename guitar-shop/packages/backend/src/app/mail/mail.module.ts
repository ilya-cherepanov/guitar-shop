import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { getMailConfig } from '../../config/mail.config';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRootAsync(getMailConfig())],
  exports: [MailerModule],
  providers: [MailService],
})
export class MailModule {}
