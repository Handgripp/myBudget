import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserData, UserData } from 'src/users/users.types';
import { Repository } from 'typeorm';
import { User } from '../users.entity';
import { AbstractUsersRepository } from './types/usersAbstract.repository';

@Injectable()
export class UsersRepository implements AbstractUsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async activeUser(email: string): Promise<UserData> {
    const user = await this.findOneByEmail(email);
    user.isActive = true;
    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }

  async create({
    email,
    username,
    password,
  }: CreateUserData): Promise<UserData> {
    const newUser = this.usersRepository.create({
      email,
      password,
      username,
    });
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }
  async findOneByEmail(email: string): Promise<UserData> {
    return this.usersRepository.findOneBy({ email });
  }

  async findOneByUsername(username: string): Promise<UserData> {
    return this.usersRepository.findOneBy({ username });
  }
}
