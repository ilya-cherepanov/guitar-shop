export const SALT_ROUNDS = 10;
export const ENV_FILE_PATH = '../.env';
export const USER_WITH_EMAIL_ALREADY_EXISTS = 'The user with this email already exists!';
export const PRISMA_VIOLATION_OF_UNIQUENESS_CODE = 'P2002';
export const JWT_TOKEN_EXPIRES_IN = '1d';
export const AUTH_NOT_VALID = 'Invalid email or password!';
export const AUTH_USER_NOT_FOUND = 'User not found!';


export const enum Name {
  MinLength = 1,
  MaxLength = 15,
}

export const enum Password {
  MinLength = 6,
  MaxLength = 15,
}
