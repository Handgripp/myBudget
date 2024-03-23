import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Expenses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Users, (users) => users.id)
  userId: Users[];

  @Column()
  category: string;

  @Column()
  cost: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
