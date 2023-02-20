import { fillObject } from '@guitar-shop/core';
import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAdminAuthGuard } from '../auth/guards/jwt-admin-auth.guard';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddOrderDTO } from './dto/add-order.dto';
import { OrdersService } from './orders.service';
import { GetOrdersQuery } from './query/get-orders.query';
import { OrderListRDO } from './rdo/order-list.rdo';
import { OrderRDO } from './rdo/order.rdo';


@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @UseGuards(JWTAdminAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: OrderRDO,
    description: 'Возвращает заказ по id',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не аутентифицирован или не является администратором',
  })
  async get(@Param('id', ParseIntPipe) id: number) {
    return fillObject(OrderRDO, await this.ordersService.getOne(id));
  }

  @Get()
  @UseGuards(JWTAdminAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: OrderListRDO,
    description: 'Получить список заказов',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не аутентифицирован или не является администратором',
  })
  async getMany(@Query() query: GetOrdersQuery) {
    return fillObject(OrderListRDO, await this.ordersService.getMany(query));
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: OrderRDO,
    description: 'Создает новый заказ',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не аутентифицирован',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Товар с данным id не найден',
  })
  async create(@Body() dto: AddOrderDTO, @Req() request: Express.Request) {
    return fillObject(OrderRDO, await this.ordersService.create(dto, request.user['id']));
  }

  @Delete(':id')
  @UseGuards(JWTAdminAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    description: 'Удаляет заказ по идентификатору',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Заказ с данным id не найден',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не аутентифицирован или не является администратором',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.ordersService.delete(id);
  }

  @Delete(':orderId/products/:productId')
  @UseGuards(JWTAdminAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Удаляет позицию заказа',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Заказ или товар с данным id не найден',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не аутентифицирован или не является администратором',
  })
  async deleteOrderItem(@Param('orderId', ParseIntPipe) orderId: number, @Param('productId', ParseIntPipe) productId: number) {
    await this.ordersService.deleteOrderItem(orderId, productId);
  }
}
