import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  identifier: string; // Can be email or phone number

  password?: string; // Optional for phone-based login
}
