import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { RoleType } from '../../constants';
import { Uuid } from '../../constants/uuid-type';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signAccessToken(payload: {
    role: RoleType;
    userId: Uuid;
  }): Promise<string> {
    const expiresIn = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    );

    const secret = this.configService.get('JWT_ACCESS_TOKEN_SECRET');

    return this.jwtService.signAsync({ ...payload }, { secret, expiresIn });
  }
}
