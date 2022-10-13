import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards';
import { JwtStrategy } from './strategies';

@Module({
  imports: [ConfigModule, UsersModule, JwtModule.register({})],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JWTAuthGuard },
  ],
})
export class AuthModule {}
