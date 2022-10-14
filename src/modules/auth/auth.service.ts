import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { RoleType } from '../../constants';
import { InvalidEmailOrPasswordException } from '../../exceptions';
import { Uuid } from '../../types-interfaces';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

import { UserLoginDto } from './dto';

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

    return this.jwtService.signAsync(
      { ...payload, type: 'ACCESS_TOKEN' },
      { secret, expiresIn },
    );
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const userEntity = await this.userService.getUserByEmail(
      userLoginDto.email,
    );

    if (!userEntity) {
      throw new InvalidEmailOrPasswordException();
    }

    const isPasswordValid = await bcrypt.compare(
      userLoginDto.password,
      userEntity.password,
    );

    if (!isPasswordValid) {
      throw new InvalidEmailOrPasswordException();
    }

    return userEntity;
  }
}
