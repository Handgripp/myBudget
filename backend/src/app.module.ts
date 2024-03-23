import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from 'env.validate';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { User } from './shared/entities/users.entity';
import { UsersModule } from './users/users.module';
import { ExpensesController } from './expenses/expenses.controller';
import { ExpensesService } from './expenses/expenses.service';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    MailModule,
    ExpensesModule,
  ],
  controllers: [AppController, ExpensesController],
  providers: [AppService, ExpensesService],
})
export class AppModule {}
