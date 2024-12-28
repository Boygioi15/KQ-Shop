import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AddNewAddressDTO {
  @IsNotEmpty()
  receiverName: string;

  @IsNotEmpty()
  receiverPhone: string;

  @IsNotEmpty()
  receiverAddress: string;

  _id:any;
  default: any;
}
