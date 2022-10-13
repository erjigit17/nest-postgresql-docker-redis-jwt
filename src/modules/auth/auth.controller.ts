import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../../decorators/public.decorator';
import { UsersService } from '../users/users.service';

import { AuthService } from './auth.service';
import {
  UserLoginDto,
  UserLoginResponseDto,
  UserRegisterDto,
  UserRegisterResponseDto,
} from './dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/register')
  @Public()
  @ApiOperation({ description: 'Use hard password and unique emails' })
  @ApiOkResponse({ description: 'Successfully Registered.' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserRegisterResponseDto> {
    const userEntity = await this.userService.create(userRegisterDto);

    const AccessToken = await this.authService.signAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    const guid = userEntity.id;

    return { AccessToken, guid };
  }

  @Post('/login')
  @Public()
  @ApiOkResponse({ description: 'Successfully login.' })
  async login(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<UserLoginResponseDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const AccessToken = await this.authService.signAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    return { AccessToken };
  }
}
