import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminDefaults } from '../constants';


@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendRegistrationNotification(userEmail: string, userPassword: string) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Регистрация на Guitar Shop',
      template: './register.hbs',
      context: {
        email: userEmail,
        password: userPassword,
        href: this.configService.get<string>('mail.frontendUrl'),
      },
    });
  }

  async setOrderNotification(orderNumber: number) {
    await this.mailerService.sendMail({
      to: AdminDefaults.Email,
      subject: 'Создан заказ',
      template: './order-created.hbs',
      context: {
        orderNumber: orderNumber,
        href: this.configService.get<string>('mail.frontendUrl'),
      },
    });
  }
}
