import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { User } from 'src/shared/entities/users.entity';
import { UsersRepository } from 'src/shared/entities/repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
