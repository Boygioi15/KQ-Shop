import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import payOSInstance  from '../helperFunctions/payOS';

@Injectable()
export class PaymentService {
  private readonly payOS;
  private readonly HOST_URL;

  constructor(private readonly configService: ConfigService) {
    this.payOS = payOSInstance;
    this.HOST_URL = this.configService.get<string>('HOST_URL');
  }

  async createPaymentLink(paymentData: any): Promise<any> {
    const body = {
      orderCode: Number(String(Date.now()).slice(-6)),
      amount: paymentData.amount || 2000,
      description: paymentData.description || 'Thanh toan don hang',
      items: paymentData.items || [
        {
          name: 'Mì tôm Hảo Hảo ly',
          quantity: 1,
          price: 2000,
        },
      ],
      returnUrl: `${this.HOST_URL}?success=true`,
      cancelUrl: `${this.HOST_URL}?canceled=true`,
    };

    return this.payOS.createPaymentLink(body);
  }
}
