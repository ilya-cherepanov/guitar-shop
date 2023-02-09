import { UserRole } from "./user-role.enum";


export interface JWTPayload {
  id: number;
  role: UserRole;
}
