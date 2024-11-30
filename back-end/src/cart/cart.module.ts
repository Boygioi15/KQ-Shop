import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem, CartItemSchema } from './cartItem.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CartItem.name, schema: CartItemSchema }])
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
