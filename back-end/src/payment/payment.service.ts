import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import payOSInstance  from '../helperFunctions/payOS';
import { CartService } from 'src/cart/cart.service';
import config from "./config"
import mongoose from 'mongoose';
import * as crypto from "crypto"
import axios from 'axios';

const config = {
  accessKey: "F8BBA842ECF85",
  secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  orderInfo: 'pay with MoMo',
  partnerCode: "MOMO",
  redirectUrl: "http://localhost:5500/order-success", // link frontend
  ipnUrl: "https://198d-2402-800-629d-a6e-7123-99ac-b012-6643.ngrok-free.app/api/payment/callback", //chú ý: cần dùng ngrok thì momo mới post đến url này được
  requestType: 'payWithMethod',
  extraData: '',
  orderGroupId: '',
  autoCapture: true,
  lang: 'vi',
};
const momo_endpoint="https://test-payment.momo.vn/v2/gateway/api/create"

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
      items: selectedItem.map((item)=> {return {
        name:item.productName,
        quantity:item.quantity,
        price:item.quantity*item.productTypeDetailPrice
      }}),
      amount: 1000
    }
    console.log(paymentData)
    const {
      accessKey,
      secretKey,
      partnerCode,
      redirectUrl,
      ipnUrl,
      requestType,
      autoCapture,
      lang,
    } = config;
    console.log(config)

    const orderId = new mongoose.Types.ObjectId();

    let rawSignature = [
      `accessKey=${accessKey}`,
      `amount=${paymentData.amount}`,
      `extraData=${JSON.stringify(paymentData)}`,
      `ipnUrl=${ipnUrl}`,
      `orderId=${orderId}`,
      `orderInfo=${"Thanh toán đơn hàng với MOMO"}`,
      `partnerCode=${partnerCode}`,
      `redirectUrl=${redirectUrl}`,
      `requestId=${orderId}`,
      `requestType=${requestType}`,
    ].join("&");
    //console.log(rawSignature);
    // Create signature

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");
    const requestBody = JSON.stringify({
      partnerCode,
      partnerName: "Tìm hiểu và xây dựng sàn thương mại điện tử bán quần áo",
      storeId: "kqShop",
      requestId:orderId,
      amount: paymentData.amount,
      orderId,
      orderInfo: "Thanh toán đơn hàng với MOMO",
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      autoCapture,
      extraData: JSON.stringify(paymentData), // Ensure it's a string
      signature,
    });

    // Axios request with error handling
    const result = await axios({
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
      data: requestBody,
    });
    return result;
  }
  async createPaymentLink_PayOS(userId: string): Promise<any> {
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
      items: selectedItem.map((item)=> {return {
        name:item.productName,
        quantity:item.quantity,
        price:item.quantity*item.productTypeDetailPrice
      }}),
      amount: cartDetail.discountedPrice
    }
    console.log(paymentData)
    const body = {
      orderCode: Number(String(Date.now()).slice(-6)),
      items: paymentData.items,
      amount: paymentData.amount || 2000,
      description: 'Thanh toan don hang',
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
