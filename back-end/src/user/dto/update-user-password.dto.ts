import { IsNotEmpty } from "class-validator"

export class UpdateUserPasswordDTO{
    @IsNotEmpty()
    oldPassword: string;
    @IsNotEmpty()
    newPassword: String;
    @IsNotEmpty()
    confirmNewPassword: String;
}