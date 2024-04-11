import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expenses } from './expenses.entity';
import { Users } from './users.entity';

@Entity()
export class Budgets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Expenses, (expenses) => expenses.budgets)
  expenses: string;

  @ManyToOne(() => Users, (users) => users.budgets)
  user: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
