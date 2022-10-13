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
import { Uuid } from '../../types-interfaces';
import { UserRegisterDto } from '../auth/dto';

import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto';

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

  async create(createUserDto: UserRegisterDto): Promise<UserEntity> {
    await this.checkEmailIsTaken(createUserDto.email);

    const hash = await bcrypt.hash(createUserDto.password, 10);

    return this.userRepository.save({
      ...createUserDto,
      password: hash,
    });
  }

  async findOneUserById(id: Uuid): Promise<UserEntity> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.where({ id });
    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
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
