import { IsNotEmpty } from 'class-validator';

export class ProductIdentifier {
  @IsNotEmpty()
  productID: string;
  @IsNotEmpty()
  product_typeID: string;
  @IsNotEmpty()
  product_type_detailID: string;
}
