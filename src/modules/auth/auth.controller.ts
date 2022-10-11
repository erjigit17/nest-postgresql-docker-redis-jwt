import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { TokenPayloadDto } from './dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: TokenPayloadDto })
  async login(@Body() tokenPayloadDto: TokenPayloadDto): Promise<string> {
    return this.authService.signAccessToken(tokenPayloadDto);
  }
}
