import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import {
  AbstractEntity,
  IAbstractEntity,
} from '../../../common/abstract.entity';
import { RoleType } from '../../../constants';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { UserDto } from '../dto/user.dto';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true })
  email!: string;

  @Exclude()
  @Column()
  password!: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: true })
  isActual?: boolean;
}

export interface IUserEntity extends IAbstractEntity<UserDto> {
  firstName?: string;

  lastName?: string;

  role: RoleType;

  email?: string;

  password?: string;

  avatar?: string;

  fullName?: string;
}
