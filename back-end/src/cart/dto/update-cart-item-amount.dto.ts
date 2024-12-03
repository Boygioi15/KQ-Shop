import { IsNotEmpty, IsNumber } from "class-validator";

export class updateCartItemAmountDto{
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}