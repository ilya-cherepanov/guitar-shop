export const SALT_ROUNDS = 10;
export const ENV_FILE_PATH = '../.env';
export const USER_WITH_EMAIL_ALREADY_EXISTS = 'The user with this email already exists!';
export const PRISMA_VIOLATION_OF_UNIQUENESS_CODE = 'P2002';
export const PRISMA_NOT_FOUND_CODE = 'P2025';
export const JWT_TOKEN_EXPIRES_IN = '1d';
export const AUTH_NOT_VALID = 'Invalid email or password!';
export const AUTH_USER_NOT_FOUND = 'User not found!';
export const PHOTO_FILE_TYPES = /(png|jpg|jpeg)/;
export const PRODUCTS_PER_PAGE = 9;
export const ORDERS_PER_PAGE = 6;
export const MAX_COMMENTS_COUNT = 50;
export const PRODUCT_NOT_FOUND = 'The product with this id was not found!';
export const ORDER_NOT_FOUND = 'The order with this id was not found!';
export const MOCK_IMAGES_DIR = 'mock-images';
export const USER_MUST_BE_ADMIN = 'The user must be an administrator!';


export const enum Name {
  MinLength = 1,
  MaxLength = 15,
}

export const enum Password {
  MinLength = 6,
  MaxLength = 15,
  // Иначе дефолтный admin с паролем admin не сможет залогиниться
  LoginMinLength = Password.MinLength - 1,
}

export const enum ProductTitle {
  MinLength = 10,
  MaxLength = 100,
}

export const enum ProductDescription {
  MinLength = 20,
  MaxLength = 1024,
}

export const enum ProductArticle {
  MinLength = 5,
  MaxLength = 40,
}

export const enum ProductPrice {
  Min = 100,
  Max = 1_000_000,
}

export const enum CommentAdvantages {
  MinLength = 50,
  MaxLength = 100,
}

export const enum CommentDisadvantages {
  MinLength = 50,
  MaxLength = 100,
}

export const enum CommentText {
  MinLength = 5,
  MaxLength = 1024,
}

export const enum CommentRating {
  Min = 1,
  Max = 5,
}

export const enum AdminDefaults {
  Password = 'admin',
  Name = 'admin',
  Email = 'admin@mail.com',
}
