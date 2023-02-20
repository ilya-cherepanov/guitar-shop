import { fillObject } from '@guitar-shop/core';
import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAdminAuthGuard } from '../auth/guards/jwt-admin-auth.guard';
import { PHOTO_FILE_TYPES } from '../constants';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { GetProductsQuery } from './query/get-produts.query';
import { ProductListRDO } from './rdo/product-list.rdo';
import { ProductRDO } from './rdo/product.rdo';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}


  @Get(':id')
  @ApiResponse({
    type: ProductRDO,
    status: HttpStatus.OK,
    description: 'Возвращает карточку товара c данным идентификатором',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Товар с данным ID не найден',
  })
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    return fillObject(ProductRDO, await this.productsService.get(id));
  }

  @Get()
  @ApiResponse({
    type: ProductRDO,
    status: HttpStatus.OK,
    description: 'Возвращает карточки товаров',
  })
  public async getAll(@Query() query: GetProductsQuery) {
    return fillObject(ProductListRDO, await this.productsService.getAll(query));
  }

  @Post()
  @UseGuards(JWTAdminAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    type: ProductRDO,
    status: HttpStatus.CREATED,
    description: 'Возвращает новую карточку товара',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не аутентифицирован или не является администратором'
  })
  public async create(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({fileType: PHOTO_FILE_TYPES})
      .build()
  ) file: Express.Multer.File, @Body() dto: CreateProductDTO) {
    return fillObject(ProductRDO, await this.productsService.create(file.filename, dto));
  }

  @Put(':id')
  @UseGuards(JWTAdminAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    type: ProductRDO,
    status: HttpStatus.OK,
    description: 'Возвращает обновленную карточку товара',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Товар с данным ID не найден',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не аутентифицирован или не является администратором'
  })
  public async update(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({fileType: PHOTO_FILE_TYPES})
      .build({fileIsRequired: false})
  ) file: Express.Multer.File, @Body() dto: UpdateProductDTO, @Param('id', ParseIntPipe) id: number) {
    return fillObject(ProductRDO, await this.productsService.update(id, file?.filename, dto));
  }

  @Delete(':id')
  @UseGuards(JWTAdminAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Удаляет карточку товара',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Товар с данным ID не найден',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не аутентифицирован или не является администратором'
  })
  public async delete(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.delete(id);
  }
}
