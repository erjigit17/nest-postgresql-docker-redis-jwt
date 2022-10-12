import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { Guid, Uuid } from '../../types-interfaces';
import { UserRegisterDto } from '../auth/dto/user-register.dto';

import { UserEntity } from './entities/user.entity';
import { UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async checkEmailIsTaken(email: string): Promise<void> {
    const checkUser = await this.userRepository.findOneBy({ email });

    if (checkUser) {
      throw new BadRequestException('Email already used');
    }
  }

  async create(createUserDto: UserRegisterDto): Promise<Guid> {
    await this.checkEmailIsTaken(createUserDto.email);

    const hash = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.save({
      ...createUserDto,
      password: hash,
    });

    return { guid: user.id };
  }

  async findOneUserById(id: Uuid): Promise<UserDto> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.where({ id });
    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity.toDto();
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  async findAll(findDate: FindOptionsWhere<UserEntity>): Promise<UserEntity[]> {
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
