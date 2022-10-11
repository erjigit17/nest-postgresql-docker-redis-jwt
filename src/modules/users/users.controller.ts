import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, IsNull, Not, UpdateResult } from 'typeorm';

import { Uuid } from '../../constants/uuid-type';
import { UUIDParam } from '../../decorators/http.decorators';

import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<{ id: string }> {
    return this.usersService.create(createUserDto);
  }

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
  remove(@Param('guid') guid: string): Promise<DeleteResult> {
    return this.usersService.remove(guid);
  }
}
