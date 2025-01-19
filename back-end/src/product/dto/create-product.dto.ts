import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductTypesDetailDto {
  @IsNotEmpty()
  @IsString()
  size_name: string;

  @IsString()
  @IsOptional()
  size_moreInfo?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNumber()
  sold: number = 0;

  @IsNotEmpty()
  @IsNumber()
  inStorage: number;

  sku?: string;
}
export class ProductTypesDto {
  @IsNotEmpty()
  @IsString()
  color_name: string;

  @IsArray()
  @IsString({ each: true }) // Validate each element in the array as a string
  color_ImageURL: string[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) // Validate each element in the array as a ProductTypesDetailDto
  @Type(() => ProductTypesDetailDto)
  details: ProductTypesDetailDto[];
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  name: string;

  slug: string;
  @IsNotEmpty()
  init_thumbnailURL: string;

  @IsNotEmpty()
  hover_thumbnailURL: string;

  @IsNotEmpty()
  categoryRef: string;

  @IsNotEmpty()
  shopRef: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) 
  @Type(() => ProductTypesDto)
  types: ProductTypesDto[];

  @IsNotEmpty()
  attributes: Record<string, string>;

  @IsNotEmpty()
  isPublished: boolean;
}
