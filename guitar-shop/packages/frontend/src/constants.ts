import { NUMBER_OF_STRINGS } from '@guitar-shop/core';
import { NumberOfStringsType, ProductType } from '@guitar-shop/shared-types';
import { SortByType } from './types/sorting';


export const enum SliceNameSpace {
  Products = 'products',
  OneProduct = 'oneProduct',
  User = 'user',
  Cart = 'cart',
  Orders = 'orders',
  OneOrder = 'oneOrder',
  Comments = 'comments',
}

export const enum ModalType {
  Default = '',
  Success = 'modal--success',
  ModalReview = 'modal--review',
  ModalEnter = 'modal--enter',
}


export const enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


export const SortByNames: { [key in SortByType]: string } = {
  sortByAdding: 'по дате',
  sortByPrice: 'по цене',
  sortByRating: 'по рейтингу',
} as const;

export const ProductTypeToStringsRestrictions: { [key in ProductType]: NumberOfStringsType[] } = {
  [ProductType.Acoustic]: [6, 7, 12],
  [ProductType.Electric]: [4, 6, 7],
  [ProductType.Ukulele]: [4],
};

export const StringsToProductTypeRestrictions: { [key in NumberOfStringsType]: ProductType[] } = {
  [NUMBER_OF_STRINGS[0]]: [ProductType.Electric, ProductType.Ukulele],
  [NUMBER_OF_STRINGS[1]]: [ProductType.Electric, ProductType.Acoustic],
  [NUMBER_OF_STRINGS[2]]: [ProductType.Electric, ProductType.Acoustic],
  [NUMBER_OF_STRINGS[3]]: [ProductType.Acoustic],
};

export const ProductTypeTranslation: { [key in ProductType ]: string } = {
  [ProductType.Acoustic]: 'Акустическая гитара',
  [ProductType.Electric]: 'Электрогитара',
  [ProductType.Ukulele]: 'Укулеле',
} as const;

export const ProductTypeFilterMap: { [ key in ProductType ]: string } = {
  [ProductType.Acoustic]: 'Акустические гитары',
  [ProductType.Electric]: 'Электрогитары',
  [ProductType.Ukulele]: 'Укулеле',
} as const;

export const enum ProductTab {
  Characteristics = 'CHARACTERISTICS',
  Description = 'DESCRIPTION',
}

export const RatePlural = {
  0: 'Не оценено',
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
} as const;

export const BACKEND_URL = 'http://localhost:3333/api';
export const BACKEND_STATIC_URL = 'http://localhost:3333/static';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'AUTH_TOKEN';
export const CART_KEY_NAME = 'cart';
export const COMMENT_PER_PAGE = 3;
export const FILTER_CHANGE_DELAY = 500;
export const INCORRECT_FORM = 'Не верно заполнена форма!';
