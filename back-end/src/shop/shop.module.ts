import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ShopSchema } from './shop.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Shop', schema: ShopSchema }])],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService]
})
export class ShopModule {}
