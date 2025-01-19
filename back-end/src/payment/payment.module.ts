import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [ConfigModule.forRoot(),CartModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
