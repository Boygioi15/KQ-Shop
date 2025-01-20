import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
  BadRequestException,
  Get,
  Request,
  UseGuards,
  Req,
  Res
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtGuard } from './guards/jwt.guard';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Get('user-detail')
  @UseGuards(JwtGuard)
  async getUserDetail(@Request() req) {
    console.log("Auth header: ", req.headers.authorization)
    console.log("ID "+JSON.stringify(req.user))
    return await this.userService.getUserDetail(req.user._id);
  }
  @Post('sign-up')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('verify-otp')
  async verifyOtpSignUp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Headers('Authorization') token: string,
  ) {
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }
    return this.authService.verifyOtpSignUp(verifyOtpDto, token);
  }

  @Post('sign-in')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { identifier, password } = loginUserDto;

    if (this.isPhoneNumber(identifier)) {
      return this.authService.loginWithPhone(identifier);
    } else if (this.isValidEmail(identifier)) {
      if (!password) {
        throw new BadRequestException('Password is required for email login.');
      }
      return this.authService.loginWithEmail(identifier, password);
    } else {
      throw new BadRequestException(
        'Invalid identifier. Provide email or phone number.',
      );
    }
  }

  @Post('sign-in/verify-otp')
  async verifyOtpSignIn(@Body() verifyOtpDto: VerifyOtpDto) {
    if (!verifyOtpDto.otp) {
      throw new BadRequestException('OTP is required');
    }
    return this.authService.verifyOtpSignIn(verifyOtpDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const token = await this.authService.googleLogin(req);
    const tokenString = typeof token === 'string' ? token : token.token;
    res.redirect(`http://localhost:5500/auth/social-callback?token=${encodeURIComponent(tokenString)}`);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req, @Res() res: Response) {
    const token = await this.authService.facebookLogin(req);
    console.log(token)
    const tokenString = typeof token === 'string' ? token : token.token;
    res.redirect(`http://localhost:5500/auth/social-callback?token=${encodeURIComponent(tokenString)}`);
  }

  @Post('logout')
  async logout(@Request() req) {
    const token = req.headers['authorization']?.split(' ')[1];
    return this.authService.logout(token);
  }

  private isPhoneNumber(identifier: string): boolean {
    return /^\+?[0-9]+$/.test(identifier);
  }

  private isValidEmail(identifier: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  }

  @Post('shop-sign-in')
  async shopLogin(@Body() shopLoginDto: LoginUserDto) {
    const { identifier, password } = shopLoginDto;

    if (!this.isValidEmail(identifier)) {
      throw new BadRequestException('Invalid email format');
    }

    return this.authService.loginAsShop(identifier, password);
  }

  //   @Post('verify-jwt')
  //   @HttpCode(HttpStatus.OK)
  //   verifyJwt(@Body() payload: { jwt: string }) {
  //     return this.authService.verifyJwt(payload.jwt);
  //   }
}
