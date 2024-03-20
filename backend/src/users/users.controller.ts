import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequestDto } from './dtos/request/createUserRequest.dto';

@Controller('users')
export class UsersController {
  @Post('')
  async createUser(@Body() body: CreateUserRequestDto) {
    console.log(body);
  }
}
