import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateShopDto {
  @IsNotEmpty()
  name: string;
  logoURL: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  contactPhone: string;
  @IsNotEmpty()
  contactEmail: string;

  @IsNotEmpty()
  userRef: string;
}
