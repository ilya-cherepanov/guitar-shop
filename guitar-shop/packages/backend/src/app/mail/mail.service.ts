import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  async sendRegistrationNotification(userEmail: string, userPassword: string) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Регистрация на Guitar Shop',
      template: './register.hbs',
      context: {
        email: userEmail,
        password: userPassword,
        href: 'http://localhost',
      }
    });
  }
}
