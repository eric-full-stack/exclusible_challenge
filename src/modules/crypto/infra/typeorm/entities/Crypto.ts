import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admin_settings')
export default class Crypto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pair: string;

  @Column()
  spread: number;

  @Column()
  rate: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
