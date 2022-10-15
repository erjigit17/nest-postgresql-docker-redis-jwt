import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Uuid } from '../../../types-interfaces';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column('varchar', { length: 255 })
  title: string;

  @Column({ nullable: true })
  descriptions?: string;

  @Column({ array: true, type: 'varchar', length: 255, nullable: true })
  images: string[];

  @Column({ array: true, type: 'varchar', length: 255, nullable: true })
  tags: string[];

  @Column({ type: 'money' })
  price: number;

  @Column({ default: false })
  isArchive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.products)
  @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;
}
