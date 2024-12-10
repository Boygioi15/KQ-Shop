import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.schema';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ShopModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [MongooseModule, ProductService]
})
export class ProductModule {}
