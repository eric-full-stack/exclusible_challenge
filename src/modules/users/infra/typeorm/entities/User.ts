import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  type: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
