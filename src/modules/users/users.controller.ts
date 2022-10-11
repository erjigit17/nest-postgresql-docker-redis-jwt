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
import { DeleteResult, IsNull, Not, UpdateResult } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<{ id: string }> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll({ id: Not(IsNull()) });
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.remove(id);
  }
}
