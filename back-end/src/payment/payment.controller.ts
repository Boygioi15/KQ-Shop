import { Controller, Post, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('create-payment/momo')
  async createPayment_Momo(@Body() paymentData, @Res() res:Response){
    
  }
  @Post('call-back/momo')
  async callBack_Momo(){

  }
  @Post('create-payment/direct')
  async createPayment_Direct(@Body() paymentData, @Res() res:Response){

  }
  @Post('create-payment/payOS')
  async createPayment_PayOS(@Body() paymentData, @Res() res:Response){
    
  }
  @Post('call-back/payOS')
  async callBack_PayOS(){

  }
  @Post('create-payment-link')
  async createPaymentLink(@Body() paymentData: any, @Res() res: Response) {
    try {
      const paymentLinkResponse = await this.paymentService.createPaymentLink(paymentData);
      res.redirect(paymentLinkResponse.checkoutUrl);
    } catch (error) {
      console.error(error);
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
