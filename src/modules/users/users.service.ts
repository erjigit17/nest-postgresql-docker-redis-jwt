import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkEmailIsTaken(email: string): Promise<void> {
    const checkUser = await this.userRepository.findOneBy({ email });

    if (checkUser) {
      throw new BadRequestException('Email already used');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<{ id: string }> {
    await this.checkEmailIsTaken(createUserDto.email);

    const hash = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.save({
      ...createUserDto,
      password: hash,
    });

    return { id: user.id };
  }

  async findOne(findDate: FindOptionsWhere<User>): Promise<User | null> {
    return this.userRepository.findOneBy(findDate);
  }

  async findAll(findDate: FindOptionsWhere<User>): Promise<User[]> {
    return this.userRepository.findBy(findDate);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    if (updateUserDto.email) {
      await this.checkEmailIsTaken(updateUserDto.email);
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
