import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Budgets } from './budgets.entity';

@Entity()
export class Expenses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (users) => users.expenses)
  user: string;

  @ManyToOne(() => Budgets, (budgets) => budgets.expenses)
  budgets: string;

  @Column()
  category: string;

  @Column()
  cost: string;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
