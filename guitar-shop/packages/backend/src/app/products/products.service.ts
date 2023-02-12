import { Injectable, NotFoundException } from '@nestjs/common';
import { PRODUCTS_PER_PAGE, PRODUCT_NOT_FOUND } from '../constants';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { GetProductsQuery } from './query/get-produts.query';


@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  public async create(photo: string, dto: CreateProductDTO) {
    const newProductEntity = new ProductEntity({
      ...dto,
      photo,
    });

    return this.productRepository.create(newProductEntity);
  }

  public async get(productId: number) {
    const existingProduct = await this.productRepository.findById(productId);

    if (!existingProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    return existingProduct;
  }

  public async getAll(query: GetProductsQuery) {
    const skip = query.page * PRODUCTS_PER_PAGE;

    return this.productRepository.findAll(skip, PRODUCTS_PER_PAGE, {
      numbersOfString: query.numbersOfStrings,
      productTypes: query.productTypes,
    }, {
      sortByAdding: query.sortByAdding,
      sortByPrice: query.sortByPrice,
      sortByRating: query.sortByRating,
    });
  }

  public async update(productId: number, photo: string | null, dto: UpdateProductDTO) {
    const existingProduct = await this.productRepository.findById(productId);

    if (!existingProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    const updatedProductEntity = new ProductEntity({
      ...existingProduct,
      ...dto,
      photo: photo ? photo : existingProduct.photo,
    });

    return this.productRepository.update(productId,  updatedProductEntity);
  }

  public async delete(productId: number) {
    await this.productRepository.delete(productId);
  }
}
