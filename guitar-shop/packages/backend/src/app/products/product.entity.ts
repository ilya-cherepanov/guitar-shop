import { NumberOfStringsType, Product, ProductType } from '@guitar-shop/shared-types';
import { Prisma } from '@prisma/client';


export class ProductEntity implements Product {
  id?: number;
  title: string;
  description: string;
  type: ProductType;
  article: string;
  numberOfStrings: NumberOfStringsType;
  photo: string;
  price: number;
  createdAt: Date;

  constructor(product: Product) {
    this.fillEntity(product);
  }

  public toPrismaObject() {
    return {
      ...this,
      price: new Prisma.Decimal(this.price),
    };
  }

  public fillEntity(product: Product): void {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.type = product.type;
    this.article = product.article;
    this.numberOfStrings = product.numberOfStrings;
    this.photo = product.photo;
    this.price = product.price;
    this.createdAt = product.createdAt;
  }
}
