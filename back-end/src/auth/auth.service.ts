import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Twilio } from 'twilio';

import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  private otpStore = new Map<string, { otp: string; timestamp: number }>(); // Store OTP temporarily
  private readonly OTP_EXPIRATION_TIME = 60 * 1000;
  private twilioClient: Twilio;
  private tokenBlacklist: Set<string> = new Set();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.twilioClient = new Twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  // Sign up a new user

  async register(registerDto: RegisterDto) {
    const { identifier } = registerDto;

    const isEmail = this.isValidEmail(identifier);

    if (isEmail) {
      return this.registerByEmail(registerDto);
    } else {
      return this.registerByPhone(registerDto);
    }
  }

  async registerByEmail(registerDto: RegisterDto) {
    const { fullName, identifier, password } = registerDto;
    const token = this.jwtService.sign({ registerDto });
    const otp = this.generateOtp();

    await this.sendOtpByEmail(identifier, otp);
    this.storeOtp(identifier, otp);

    return {
      token,
      message: 'OTP sent via email!',
    };
  }

  async registerByPhone(registerDto: RegisterDto) {
    const { fullName, identifier } = registerDto;
    const token = this.jwtService.sign({ registerDto });
    const otp = this.generateOtp();

    await this.sendOtpByPhone(identifier, otp);
    this.storeOtp(identifier, otp);

    return {
      token,
      message: 'OTP sent via phone. No password required!',
    };
  }

  // OTP verification handler

  async verifyOtpSignUp(verifyOtpDto: VerifyOtpDto, token: string) {
    const { otp } = verifyOtpDto;
    const decodedToken = this.jwtService.verify(token);
    const { registerDto } = decodedToken;
    const { fullName, identifier, password } = registerDto;

    const storedOtpData = this.otpStore.get(identifier);

    if (!storedOtpData) {
      throw new BadRequestException('OTP not found');
    }

    const { otp: storedOtp, timestamp } = storedOtpData;

    // Check if the OTP has expired
    if (this.isOtpExpired(timestamp)) {
      this.otpStore.delete(identifier);
      throw new BadRequestException('OTP has expired');
    }

    // Verify the OTP
    if (storedOtp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    let newUser;
    if (this.isValidEmail(identifier)) {
      if (!password) {
        throw new BadRequestException(
          'Password is required for email verification',
        );
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user with email and hashed password
      newUser = await this.userService.create(
        fullName,
        identifier,
        hashedPassword,
      );
    } else {
      newUser = await this.userService.create(fullName, identifier);
    }
    this.otpStore.delete(identifier);
    return newUser;
  }

  async verifyOtpSignIn(verifyOtpDto: VerifyOtpDto) {
    const { phone, otp } = verifyOtpDto;
    const storedOtpData = this.otpStore.get(phone); // Get the stored OTP\

    if (!storedOtpData) {
      throw new BadRequestException('OTP expired or not found.');
    }

    const { otp: storedOtp, timestamp } = storedOtpData;

    if (this.isOtpExpired(timestamp)) {
      this.otpStore.delete(phone);
      throw new BadRequestException('OTP has expired');
    }

    if (storedOtp !== otp) {
      throw new BadRequestException('Invalid OTP.');
    }

    this.otpStore.delete(phone);
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new BadRequestException('User not found.');
    }

    // Generate JWT
    const token = this.jwtService.sign({
      id: user._id,
      role: user.role,
    });
    return { token };
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  }

  private storeOtp(identifier: string, otp: string): void {
    const timestamp = Date.now();
    this.otpStore.set(identifier, { otp, timestamp });
  }

  private isOtpExpired(timestamp: number): boolean {
    const currentTime = Date.now();
    return currentTime - timestamp > this.OTP_EXPIRATION_TIME;
  }

  private isValidEmail(identifier: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
  }

  private async sendOtpByEmail(email: string, otp: string) {
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'HEHEHE APP',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  }

  private async sendOtpByPhone(phone: string, otp: string) {
    await this.twilioClient.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
  }

  async isPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // async verifyJwt(jwt: string): Promise<{ exp: number }> {
  //   try {
  //     const { exp } = await this.jwtService.verifyAsync(jwt);
  //     return { exp };
  //   } catch (error) {
  //     throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
  //   }
  // }

  // Sign in a user

  async loginWithEmail(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password.');
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordMatch) {
      throw new BadRequestException('Invalid email or password.');
    }

    // Generate JWT
    const token = this.jwtService.sign({
      id: user._id,
      role: user.role,
    });
    return { token };
  }

  async loginWithPhone(phone: string) {
    const user = await this.userService.findByPhone(phone);

    if (!user) {
      throw new BadRequestException('Phone number not found.');
    }

    // Generate OTP and store it temporarily
    const otp = this.generateOtp();
    await this.sendOtpByPhone(phone, otp);
    this.storeOtp(phone, otp);

    return { message: 'OTP sent to phone number.' };
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const payload = req.user;

    const user = await this.userService.findOrCreate({
      email: payload.email,
      name: payload.name,
      googleId: payload.id,
    });

    const token = this.jwtService.sign({ id: user._id, role: user.role });
    return { token };
  }

  async facebookLogin(req) {
    if (!req.user) {
      return 'No user from facebook';
    }

    const payload = req.user;

    const user = await this.userService.findOrCreate({
      email: payload.email,
      name: payload.name,
      facebookId: payload.id,
    });

    const token = this.jwtService.sign({ id: user._id, role: user.role });
    return { token };
  }

  // Loging out and jwt token handler

  private async validateToken(token: string) {
    if (this.tokenBlacklist.has(token)) {
      throw new UnauthorizedException(
        'Token is invalid or has been logged out.',
      );
    }
  }

  async refreshToken(oldToken: string): Promise<{ newToken: string }> {
    await this.validateToken(oldToken); // Ensure the old token is valid and not blacklisted

    const decodedToken = this.jwtService.verify(oldToken);
    const { id, role } = decodedToken;

    // Generate a new token with the same payload
    const newToken = this.jwtService.sign({ id: id, role: role });

    return { newToken };
  }

  async logout(token: string): Promise<{ message: string }> {
    if (token) {
      this.tokenBlacklist.add(token);
    }
    return { message: 'Logged out successfully' };
  }
}
