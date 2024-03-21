import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'a@a.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Kamil1234!' })
  @IsString()
  password: string;
}
