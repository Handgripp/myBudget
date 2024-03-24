import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { UsersRepository } from 'src/shared/repositories/users.repository';
import { CreateUserData } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async getOne(email: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async activator(email: string) {
    const user = await this.getOne(email);

    if (!user.isActive) {
      const updatedUser = this.usersRepository.activeUser(email);
      return updatedUser;
    } else {
      throw new ConflictException('The account is already activated');
    }
  }

  async add({ username, email, password: userPassword }: CreateUserData) {
    await this.assertUniqueEmailAndUsername(username, email);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    const createdUser = await this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    const payload = { sub: createdUser.id, email: createdUser.email };
    const token = await this.jwtService.signAsync(payload);
    await this.mailService.sendUserConfirmation(createdUser, token);
    return createdUser;
  }

  private async assertUniqueEmailAndUsername(username: string, email: string) {
    const emailExist = await this.usersRepository.findOneByEmail(email);
    if (emailExist) {
      throw new ConflictException('Account with this email already exists');
    }
    const usernameExist =
      await this.usersRepository.findOneByUsername(username);
    if (usernameExist) {
      throw new ConflictException('Account with this username already exists.');
    }
  }
}
