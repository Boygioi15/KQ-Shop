import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import payOSInstance  from '../helperFunctions/payOS';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class PaymentService {
  private readonly payOS;
  private readonly HOST_URL;

  constructor(private readonly configService: ConfigService, private readonly cartService: CartService) {
    this.payOS = payOSInstance;
    this.HOST_URL = this.configService.get<string>('HOST_URL');
  }
  async createPaymentLink_MOMO(userId: string): Promise<any> {
    console.log('payOSInstance', payOSInstance); 

    const cart = await this.cartService.findCartOfUser(userId);
    const cartDetail = await this.cartService.getCartDetail(cart);
    let selectedItem = [];
    cartDetail.shopGroup.map((group)=>{
      group.itemList.map((item)=>{
        if(item.selected){
          selectedItem.push(item);
        }
      })
    })
    const paymentData = {
      item: selectedItem,
      amount: cartDetail.discountedPrice
    };
    const body = {
      orderCode: Number(String(Date.now()).slice(-6)),
      amount: paymentData.amount || 2000,
      returnUrl: `${this.HOST_URL}?success=true`,
      cancelUrl: `${this.HOST_URL}?canceled=true`,
    };

    return this.payOS.createPaymentLink(body);
  }
  async createPaymentLink(paymentData: any): Promise<any> {
    console.log('payOSInstance', payOSInstance); 

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
