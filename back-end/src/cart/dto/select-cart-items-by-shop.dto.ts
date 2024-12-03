import { IsNotEmpty, IsBoolean } from "class-validator";

export class SelectCartItemsByShopDto{
    @IsNotEmpty()
    @IsBoolean()
    select: boolean;
}