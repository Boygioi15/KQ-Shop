import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message:"Please enter correct email" } )
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string
}