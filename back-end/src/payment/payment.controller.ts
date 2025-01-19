import { Controller, Post, Body, Res, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CartService } from 'src/cart/cart.service';

@Controller('api/payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}
  @Post('create-payment/momo')
  @UseGuards(JwtGuard)
  async createPaymentLink_Momo(@Req() req, @Res() res){
    
    try {
      const paymentLinkResponse = await this.paymentService.createPaymentLink_MOMO(req.user._id);
      res.redirect(paymentLinkResponse.checkoutUrl);
    } catch (error) {
      console.error(error);
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('create-payment/payOS')
  async createPaymentLink(@Body() paymentData: any, @Res() res: Response) {
    try {
      const paymentLinkResponse = await this.paymentService.createPaymentLink(paymentData);
      res.status(200).json({ checkoutUrl: paymentLinkResponse.checkoutUrl });
    } catch (error) {
      console.error(error);
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }  
}
