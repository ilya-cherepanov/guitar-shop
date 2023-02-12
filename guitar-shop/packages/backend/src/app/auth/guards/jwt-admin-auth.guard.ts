import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class JWTAdminAuthGuard extends AuthGuard('jwt-admin') {}
