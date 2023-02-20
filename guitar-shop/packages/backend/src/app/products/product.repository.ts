import {
  NumberOfStringsType,
  Product,
  ProductType,
  SortOrder,
} from '@guitar-shop/shared-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductFilters } from '../../types/product-filters.interface';
import { SortingParams } from '../../types/sorting-params.interface';
import { PRISMA_NOT_FOUND_CODE, PRODUCT_NOT_FOUND } from '../constants';
import { PrismaService } from '../prisma/prisma.service';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: number): Promise<Product | null> {
    const product = await this.prismaService.product.findFirst({
      where: { id },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return {
      ...product,
      type: product.type as ProductType,
      numberOfStrings: product.numberOfStrings as NumberOfStringsType,
      price: product.price.toNumber(),
    };
  }

  public async findByMultipleIds(ids: number[]): Promise<Record<number, Product>> {
    const products = await this.prismaService.product.findMany({
      where: {id: {in: ids}},
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return products.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
  }

  public async getCount(filters: ProductFilters): Promise<number> {
    return this.prismaService.product.count({
      where: {
        type: filters.productTypes.length > 0 ? {in: filters.productTypes} : undefined,
        numberOfStrings: filters.numbersOfString.length > 0 ? {in: filters.numbersOfString} : undefined,
      }
    });
  }

  public async getPrices() {
    const prices = await this.prismaService.product.aggregate({
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
    });

    return {
      minPrice: prices._min.price.toNumber(),
      maxPrice: prices._max.price.toNumber(),
    };
  }

  public async findAll(
    skip: number,
    quantity: number,
    filters: ProductFilters,
    sorting: SortingParams
  ): Promise<Product[]> {
    type QueryType = Parameters<typeof this.prismaService.product.findMany>[0];

    const query: QueryType = {
      where: {
        type: filters.productTypes.length > 0 ? {in: filters.productTypes} : undefined,
        numberOfStrings: filters.numbersOfString.length > 0 ? {in: filters.numbersOfString} : undefined,
        price: {
          gte: filters.minPrice,
          lte: filters.maxPrice,
        },
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
      take: quantity,
      skip
    };

    const orderBy = [];
    if (sorting.sortByPrice) {
      orderBy.push({price: sorting.sortByPrice});
    } else if (sorting.sortByRating) {
      orderBy.push({avgRating: sorting.sortByRating});
    } else if (sorting.sortByAdding) {
      orderBy.push({createdAt: sorting.sortByAdding});
    } else {
      orderBy.push({createdAt: 'desc'});
    }
    query.orderBy = orderBy;

    return (await this.prismaService.product.findMany(query)).map((product) => ({
      ...product,
      type: product.type as ProductType,
      numberOfStrings: product.numberOfStrings as NumberOfStringsType,
      price: product.price.toNumber(),
    }));
  }

  public async create(productEntity: ProductEntity): Promise<Product> {
    const newProduct = await this.prismaService.product.create({
      data: productEntity.toPrismaObject(),
      include: {
        _count: {
          select: {
            comments: true,
          }
        }
      },
    });

    return {
      ...newProduct,
      type: newProduct.type as ProductType,
      numberOfStrings: newProduct.numberOfStrings as NumberOfStringsType,
      price: newProduct.price.toNumber(),
    };
  }

  public async update(
    productId: number,
    productEntity: ProductEntity
  ): Promise<Product> {
    const updatedProduct = await this.prismaService.product.update({
      where: { id: productId },
      data: productEntity.toPrismaObject(),
      include: {
        _count: {
          select: {
            comments: true
          },
        },
      },
    });

    return {
      ...updatedProduct,
      type: updatedProduct.type as ProductType,
      numberOfStrings: updatedProduct.numberOfStrings as NumberOfStringsType,
      price: updatedProduct.price.toNumber(),
    };
  }

  public async delete(productId: number): Promise<void> {
    try {
      await this.prismaService.product.delete({ where: { id: productId } });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError
          && err.code === PRISMA_NOT_FOUND_CODE) {
        throw new NotFoundException(PRODUCT_NOT_FOUND);
      } else {
        throw err;
      }
    }
  }

  private buildPostgresQuery(
    skip: number,
    quantity: number,
    filters: ProductFilters,
    sorting: SortingParams
  ) {
    const productTypeFilters = Prisma.join(filters.productTypes);
    const numberOfStringsFilters = Prisma.join(filters.numbersOfString);
    const productTypeFiltersQuery =
      filters.productTypes.length > 0
        ? Prisma.sql`"Product".type IN (${productTypeFilters})`
        : Prisma.sql`TRUE`;
    const numberOfStringFiltersQuery =
      filters.numbersOfString.length > 0
        ? Prisma.sql`"Product"."numberOfStrings" IN (${numberOfStringsFilters})`
        : Prisma.sql`TRUE`;
    const where = Prisma.sql`WHERE ${productTypeFiltersQuery} AND ${numberOfStringFiltersQuery}`;

    const sortByPrice =
      sorting.sortByPrice === SortOrder.Ascending
        ? Prisma.sql`, "Product".price ASC`
        : Prisma.sql`, "Product".price DESC`;
    const sortByRating =
      sorting.sortByRating === SortOrder.Ascending
        ? Prisma.sql`, "avgRating" ASC`
        : Prisma.sql`, "avgRating" DESC`;
    const orderBy = Prisma.sql`
      ORDER BY "Product"."createdAt" DESC
      ${sorting.sortByPrice ? sortByPrice : Prisma.empty}
      ${sorting.sortByRating ? sortByRating : Prisma.empty}
    `;

    const query = Prisma.sql`
      SELECT
        "Product".id,
        "Product".title,
        "Product".type,
        "Product".description,
        "Product".article,
        "Product".price,
        "Product"."numberOfStrings",
        "Product".photo,
        "Product"."createdAt",
        AVG("Comment".rating) AS "avgRating"
      FROM "Product"
      INNER JOIN "Comment" ON "Comment"."productId" = "Product".id
      ${where}
      GROUP BY "Product".id
      ${orderBy}
      LIMIT ${quantity} OFFSET ${skip};
    `;

    return query;
  }
}
