import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RoleType } from '../../../constants';
import { Uuid } from '../../../types-interfaces';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column('varchar', { length: 255, nullable: true })
  firstName?: string;

  @Column('varchar', { length: 255, nullable: true })
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

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @OneToMany(() => ProductEntity, (product) => product.owner)
  products: ProductEntity[];
}
