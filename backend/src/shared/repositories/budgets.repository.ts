import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BudgetsData, CreateBudgetsData } from 'src/budgets/budgets.types';
import { Repository } from 'typeorm';
import { Budgets } from '../entities/budgets.entity';
import { AbstractBudgetsRepository } from './types/budgetsAbstract.repository';

@Injectable()
export class BudgetsRepository implements AbstractBudgetsRepository {
  constructor(
    @InjectRepository(Budgets)
    private budgetsRepository: Repository<Budgets>,
  ) {}

  async create({ name, user }: CreateBudgetsData): Promise<BudgetsData> {
    const newExpenses = this.budgetsRepository.create({
      name,
      user,
    });
    const savedExpenses = await this.budgetsRepository.save(newExpenses);
    return savedExpenses;
  }

  async findManyByUserId(userId: string): Promise<BudgetsData[]> {
    return await this.budgetsRepository
      .createQueryBuilder('budgets')
      .select([
        'budgets.id',
        'budgets.name',
        'budgets.createdAt',
        'budgets.updatedAt',
        'user.id',
        'user.username',
      ])
      .innerJoin('budgets.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }
}
