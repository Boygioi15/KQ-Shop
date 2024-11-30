import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from './cartItem.schema';

@Module({
  controllers: [CartController],
  providers: [CartService],
  exports: [CartItem]
})
export class CartModule {}
