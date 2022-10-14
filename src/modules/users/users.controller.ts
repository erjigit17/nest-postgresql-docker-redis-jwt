import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import { UUIDParam } from '../../decorators/http.decorators';
import { UserCnx } from '../../decorators/user-context.decorator';
import { Uuid } from '../../types-interfaces';
import { TokenPayloadDto } from '../auth/dto';

import { UpdateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth('JWT-auth')
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return this.usersService.findAll({ isActual: true });
  }

  @Get(':guid')
  @ApiOkResponse({ description: 'Get user by id' })
  getUser(@UUIDParam('guid') guid: Uuid): Promise<UserDto> {
    return this.usersService.findOneUserById(guid);
  }

  @Patch('/me')
  update(
    @UserCnx() user: TokenPayloadDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(user.userId, updateUserDto);
  }

  @Delete(':guid')
  @ApiOperation({ summary: 'Just for cleaning after tests' })
  remove(@Param('guid') guid: string): Promise<DeleteResult> {
    return this.usersService.remove(guid);
  }
}
