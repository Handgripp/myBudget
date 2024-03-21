import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.getOne(email);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
  async confirm(token: string) {
    const decoded = this.jwtService.decode(token);
    if (!decoded) {
      throw new UnauthorizedException();
    }
    const user = this.usersService.getOne(decoded.email);
    if (!user) {
      throw new NotFoundException();
    }
    const confirmedUser = await this.usersService.activator(decoded.email);
    return {
      message: 'You successfully activated your account.',
    };
  }
}
