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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult, IsNull, Not, UpdateResult } from 'typeorm';

import { UUIDParam } from '../../decorators/http.decorators';
import { Uuid } from '../../types-interfaces';

import { UpdateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return this.usersService.findAll({ id: Not(IsNull()) });
  }

  @Get(':guid')
  @ApiOkResponse({ description: 'Get user by id', type: UserDto })
  getUser(@UUIDParam('guid') guid: Uuid): Promise<UserDto> {
    return this.usersService.findOneUserById(guid);
  }

  @Patch(':guid')
  update(
    @Param('guid') guid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(guid, updateUserDto);
  }

  @Delete(':guid')
  @ApiOperation({ summary: 'Just for cleaning after tests' })
  remove(@Param('guid') guid: string): Promise<DeleteResult> {
    return this.usersService.remove(guid);
  }
}
