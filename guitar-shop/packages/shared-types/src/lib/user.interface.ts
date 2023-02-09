import { UserRole } from './user-role.enum';


export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
