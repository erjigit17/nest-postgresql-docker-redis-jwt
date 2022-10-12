import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GuidDto } from '../../common/dtos';
import { Guid } from '../../types-interfaces';
import { UsersService } from '../users/users.service';

import { TokenDto } from './dto/TokenDto';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/register')
  @ApiOkResponse({ type: GuidDto, description: 'Successfully Registered' })
  async userRegister(@Body() userRegisterDto: UserRegisterDto): Promise<Guid> {
    return this.userService.create(userRegisterDto);
  }

  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<TokenDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const AccessToken = await this.authService.signAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    return { AccessToken };
  }
}
