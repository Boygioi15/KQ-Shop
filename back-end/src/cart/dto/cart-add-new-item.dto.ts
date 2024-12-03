import { IsNotEmpty, ValidateNested  } from "class-validator";
import { ProductIdentifier } from "src/product/product.productIdentifier";
import { Type } from 'class-transformer';  // For proper nested validation

export class CartItemDto{
    @IsNotEmpty()
    @Type(() => ProductIdentifier) // Tells class-validator to validate ProductIdentifier as a class

    productIdentifier: ProductIdentifier;
    @IsNotEmpty()
    quantity: number; 
}