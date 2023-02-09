import { User } from '@guitar-shop/shared-types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PRISMA_VIOLATION_OF_UNIQUENESS_CODE, USER_WITH_EMAIL_ALREADY_EXISTS } from '../constants';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './user.entity';


@Injectable()
export class UserRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  public async findById(id: number): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({where: {id}});

    if (!user) {
      return null;
    }

    return user as User;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({where: {email}});

    if (!user) {
      return null;
    }

    return user as User;
  }

  public async create(userEntity: UserEntity): Promise<User> {
    let newUser;

    try {
      newUser = await this.prismaService.user.create({
        data: userEntity,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError
        && err.code === PRISMA_VIOLATION_OF_UNIQUENESS_CODE) {
        throw new BadRequestException(USER_WITH_EMAIL_ALREADY_EXISTS);
      }
    }

    return newUser as User;
  }
}
