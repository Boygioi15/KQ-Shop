import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsSchema, Cart } from './cart.schema';
import { ProductModule } from 'src/product/product.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartsSchema }]),
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
