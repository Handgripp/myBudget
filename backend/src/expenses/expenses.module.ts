import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenses } from 'src/shared/entities/expenses.entity';
import { ExpensesRepository } from 'src/shared/repositories/expenses.repository';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expenses])],
  controllers: [ExpensesController],
  exports: [ExpensesService, ExpensesRepository],
  providers: [ExpensesService, ExpensesRepository],
})
export class ExpensesModule {}
