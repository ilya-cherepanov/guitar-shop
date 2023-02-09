import { User, UserRole } from '@guitar-shop/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from '../constants';


export class UserEntity implements User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);

    return this;
  }

  public async checkPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public fillEntity(user: User): void {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.password = user.password;
  }
}
