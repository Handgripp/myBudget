import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ example: 'a@a.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'kamil' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'Kamil1234!' })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
