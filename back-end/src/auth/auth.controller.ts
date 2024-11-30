import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { UserDetails } from 'src/user/dto/user-details.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: RegisterUserDto): Promise<UserDetails | null> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: LoginUserDto): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }

  //   @Post('verify-jwt')
  //   @HttpCode(HttpStatus.OK)
  //   verifyJwt(@Body() payload: { jwt: string }) {
  //     return this.authService.verifyJwt(payload.jwt);
  //   }
}
