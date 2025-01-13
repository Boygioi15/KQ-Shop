import { forwardRef, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsSchema, Cart } from './cart.schema';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartsSchema }]),
    ProductModule,
    forwardRef(()=>UserModule)
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
