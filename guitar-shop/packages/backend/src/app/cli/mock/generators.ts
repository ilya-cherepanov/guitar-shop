import { NUMBER_OF_STRINGS } from '@guitar-shop/core';
import { Product, ProductType, User, UserRole } from '@guitar-shop/shared-types';
import { now, random, sample } from 'lodash';
import { AdminDefaults, MOCK_IMAGES_DIR, ProductPrice, SALT_ROUNDS } from '../../constants';
import { PRODUCT_ARTICLES, PRODUCT_DESCRIPTIONS, PRODUCT_PHOTOS, PRODUCT_TITLES } from './mock-data';
import { genSalt, hash } from 'bcrypt';


export function generateProduct(): Product {
  return {
    title: sample(PRODUCT_TITLES),
    description: sample(PRODUCT_DESCRIPTIONS),
    numberOfStrings: sample(NUMBER_OF_STRINGS),
    photo: `${MOCK_IMAGES_DIR}/${sample(PRODUCT_PHOTOS)}`,
    article: sample(PRODUCT_ARTICLES),
    type: sample(Object.values(ProductType)),
    price: random(ProductPrice.Min, ProductPrice.Max),
    createdAt: new Date(now() - random(1000, 1000000)),
  };
}


export async function generateAdmin(): Promise<User> {
  return {
    role: UserRole.Admin,
    email: AdminDefaults.Email,
    name: AdminDefaults.Name,
    password: await hash(AdminDefaults.Password, await genSalt(SALT_ROUNDS)),
  };
}
