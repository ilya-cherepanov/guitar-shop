import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from '../products/products.module';
import { OrderRepository } from './order.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';


@Module({
  imports: [ProductsModule, PrismaModule, MailModule],
  providers: [OrdersService, OrderRepository],
  controllers: [OrdersController],
})
export class OrdersModule {}
