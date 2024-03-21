import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/request/loginUserRequest.dto';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() data: LoginDto) {
    return this.authService.signIn(data.email, data.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('confirm')
  confimEmail(@Query('token') token: string) {
    return this.authService.confirm(token);
  }
}
