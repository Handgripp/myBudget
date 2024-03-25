import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateExpensesData,
  DeleteExpensesData,
  ExpensesData,
} from 'src/expenses/expenses.types';
import { Repository } from 'typeorm';
import { Expenses } from '../entities/expenses.entity';
import { AbstractExpensesRepository } from './types/expensesAbstract.repository';

@Injectable()
export class ExpensesRepository implements AbstractExpensesRepository {
  constructor(
    @InjectRepository(Expenses)
    private expensesRepository: Repository<Expenses>,
  ) {}

  async create({
    category,
    cost,
    user,
    date,
  }: CreateExpensesData): Promise<ExpensesData> {
    const newExpenses = this.expensesRepository.create({
      category,
      cost,
      user,
      date,
    });
    const savedExpenses = await this.expensesRepository.save(newExpenses);
    return savedExpenses;
  }

  async delete(expensesId: string): Promise<DeleteExpensesData> {
    const deleteResult = await this.expensesRepository.delete(expensesId);
    return deleteResult;
  }

  async findManyByUserId(userId: string): Promise<ExpensesData[]> {
    return await this.expensesRepository
      .createQueryBuilder('expenses')
      .select([
        'expenses.id',
        'expenses.category',
        'expenses.cost',
        'expenses.createdAt',
        'expenses.updatedAt',
        'expenses.date',
        'user.id',
        'user.username',
      ])
      .innerJoin('expenses.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async findOneById(userId: string, expenseId: string): Promise<ExpensesData> {
    return await this.expensesRepository
      .createQueryBuilder('expenses')
      .select([
        'expenses.id',
        'expenses.category',
        'expenses.cost',
        'expenses.createdAt',
        'expenses.updatedAt',
        'user.id',
        'user.username',
      ])
      .innerJoin('expenses.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('expenses.id = :expenseId', { expenseId })
      .getOne();
  }
}
