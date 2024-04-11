import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budgets } from 'src/shared/entities/budgets.entity';
import { BudgetsRepository } from 'src/shared/repositories/budgets.repository';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Budgets])],
  controllers: [BudgetsController],
  exports: [BudgetsService, BudgetsRepository],
  providers: [BudgetsService, BudgetsRepository],
})
export class BudgetsModule {}
