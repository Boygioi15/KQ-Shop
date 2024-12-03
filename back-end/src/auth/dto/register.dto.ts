import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  identifier: string; // Can be email or phone number

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string; // Optional (required if registering with email)
}
