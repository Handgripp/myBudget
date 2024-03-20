import { ApiProperty } from '@nestjs/swagger';
import { UserData } from 'src/users/users.types';

export class UserResponseDto {
  @ApiProperty({ example: 'a@a.com' })
  email: string;

  @ApiProperty({ example: 'kamil' })
  username: string;

  @ApiProperty()
  id: string;

  constructor(data: UserData) {
    this.email = data.email;
    this.username = data.username;
    this.id = data.id;
  }
}
