import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from './dtos/request/createUserRequest.dto';
import { UserResponseDto } from './dtos/response/userResponse.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('')
  async createUser(
    @Body() body: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.add(body);
    return new UserResponseDto(user);
  }
}
