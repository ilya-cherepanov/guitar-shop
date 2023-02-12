import { Product, User } from '@guitar-shop/shared-types';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { cpSync } from 'fs';
import { CliUtilityService, Command, CommandRunner } from 'nest-commander';
import { resolve } from 'path';
import { AdminDefaults, MOCK_IMAGES_DIR } from '../../constants';
import { generateAdmin, generateProduct } from '../mock/generators';


@Command({
  name: 'generate',
  arguments: '<n> <connection_string>',
})
export class GenerateCommand extends CommandRunner {
  private prismaClient: PrismaClient;

  constructor(
    private readonly cliUtilityService: CliUtilityService,
    private readonly configService: ConfigService,
  ) { super(); }

  async run([n, connectionString]: string[]): Promise<void> {
    const numberOfProductsToGenerate = this.cliUtilityService.parseInt(n, 10);

    // process.env.DATABASE_URL = 'postgresql://admin:password1234@localhost:5432/guitar-shop';
    process.env.DATABASE_URL = connectionString;
    this.prismaClient = new PrismaClient();

    this.copyMockImages();

    const admin = await generateAdmin();

    const products = this.generateNProducts(numberOfProductsToGenerate);

    await this.fillDb(products, admin);
  }

  private copyMockImages() {
    cpSync(
      resolve(__dirname, `assets/${MOCK_IMAGES_DIR}`),
      `${this.configService.get<string>('upload.directory')}/${MOCK_IMAGES_DIR}`,
      {
        force: true,
        recursive: true,
      }
    );
  }

  private generateNProducts(n) {
    return Array.from({length: n}, () => generateProduct());
  }

  private async fillDb(products: Product[], admin: User) {
    try {
      await this.prismaClient.$connect();

      await this.prismaClient.product.createMany({
        data: products,
      });

      await this.prismaClient.user.upsert({
        where: {email: AdminDefaults.Email},
        create: admin,
        update: admin,
      });

    } finally {
      await this.prismaClient.$disconnect();
    }
  }
}
