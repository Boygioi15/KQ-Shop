import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart, CartItem, CartDocument } from './cart.schema';
import { ProductService } from 'src/product/product.service';
import { ProductIdentifier } from 'src/product/product.productIdentifier';

import {Types as MoongooseTypes} from 'mongoose'
import { CartItemDto } from './dto/cart-add-new-item.dto';
import { updateCartItemAmountDto } from './dto/update-cart-item-amount.dto';
@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart')
    private readonly cartModel: Model<CartDocument>,
    private readonly productService: ProductService,
  ) {}
  async createAnonymous() {
    const newCart = new this.cartModel();
    console.log(newCart)
    newCart.expireDate = new Date(Date.now() + 10*1000);
    return await newCart.save();
  }
  async createWithUserRef(local_anonymous_cartID: string) {
    const newCart = new this.cartModel();
    //add item from local_anonymous cart
    await newCart.save();
    return newCart.id;
  }

  async findAll() {
    return await this.cartModel.find();
  }
  async findOne(id: string) {
    return await this.cartModel.findById(id);
  }
  async addItemToCart(
    cartID: string,
    newCartItemDto : CartItemDto
  ) {
    const {productIdentifier, quantity} = newCartItemDto;

    const cart = await this.cartModel.findById(cartID);
    console.log("Current cart: ");
    console.log(cart)
    const item = await this.checkIfItemAlreadyExisted(cart, productIdentifier);
    
    let _quantity = quantity;
    if(item){
      _quantity = item.quantity+quantity;
      console.log("Item existed")
    }
    else{
      console.log("Item not existed")
    }
    const { enough, inStorage } =
      await this.productService.checkIfThereIsEnoughInStorage(
        productIdentifier,
        _quantity,
      );
    //check enough in storage
    if (!enough) {
      if (inStorage === 0) {
        return { success: false, msg: 'There is no more in storage' };
      }
      return { success: false, msg: `There is only #${inStorage} left in storage` };
    }

    //there is enough in storage
    if(item){
      //add amount
      this.addAmountToCartItem(item,quantity);
    }
    else
    {
      //create new entry
      const newItem: CartItem = new CartItem(productIdentifier.productID,productIdentifier.product_typeID,productIdentifier.product_type_detailID,quantity)
      this.createNewCartItemEntry(cart,newItem)
  }
  return this.update(cartID,cart);
}
  async clearCart(cartID: string){
    const cart = await this.findOne(cartID)
    cart.items = [];
    return this.update(cartID,cart)
  }
  async update(id: string, cart: Cart) {
    const newCart = await this.cartModel.findByIdAndUpdate(id, cart, {new: true});
    return newCart;
  }
  remove(id: string) {
    return `This action removes a #${id} cart`;
  }

  async removeItemFromCart(cartID: string, cartItemID: string){
    const cart = await this.findOne(cartID)
    cart.items = cart.items.filter((element) => {
      return element._id.toString() !== cartItemID
    })
    return await this.update(cartID,cart)
  }
  async updateItemQuantityInCart(cartID: string, cartItemID: string, updateCartItemAmountDto: updateCartItemAmountDto){
    const cart = await this.findOne(cartID);
    const item = this.getCartItemInCart(cart,cartItemID);
    if(!item){
      throw new Error("There is no item alike in cart !")
    }
    const quantity = updateCartItemAmountDto.quantity;
    let _quantity = item.quantity+quantity;
    if(_quantity<=0){
      throw new Error("How is this supposed to be less than 1?")
    }
    const product: ProductIdentifier = {
      productID: item.productRef.toString(),
      product_typeID: item.product_typeRef.toString(),
      product_type_detailID: item.product_type_detailRef.toString()
    }
    const {enough, inStorage} = await this.productService.checkIfThereIsEnoughInStorage(product,_quantity);
    if (!enough) {
      if (inStorage === 0) {
        return { success: false, msg: 'There is no more in storage' };
      }
      return { success: false, msg: `There is only #${inStorage} left in storage` };
    }
    item.quantity=_quantity;
    return this.update(cartID, cart);
  }

  async toggleSelectCartItem(cartID: string, cartItemID: string){
    const cart = await this.findOne(cartID);
    const item = this.getCartItemInCart(cart,cartItemID);
    if(!item){
      throw new Error("There is no item alike in cart !")
    }
    item.selected = !item.selected;
    return await this.update(cartID, cart)
  }
  async selectCartItemByShop(cartID: string, shopID: string, selectCartItemByShop) {
    const cart = await this.findOne(cartID);
    const selected = selectCartItemByShop.select;
  
    for (const element of cart.items) {
      const productDetail = await this.productService.findOne(element.productRef.toString());
      if (productDetail.shopRef.toString() === shopID) {
        element.selected = selected; // Update the field
      }
    }
  
    return this.update(cartID, cart);
  }
  async selectAllItem(cartID: string, selectDto) {
    const cart = await this.findOne(cartID);
    const selected = selectDto.select;
  
    for (const element of cart.items) {
      element.selected = selected; 
    }
    return this.update(cartID, cart);
  }





  getCartItemInCart(cart: Cart, cartItemID: string) : CartItem {
    return cart.items.find((element)=> element._id.toString()===cartItemID)
  }
  async checkIfItemAlreadyExisted(cart: Cart, productIdentifier: ProductIdentifier) : Promise<CartItem> {
    const item = cart.items.find((element) => {
        return element.productRef.toString() === productIdentifier.productID &&
        element.product_typeRef.toString() === productIdentifier.product_typeID &&
        element.product_type_detailRef.toString() === productIdentifier.product_type_detailID
    });
    console.log(item)
    if(item){
      return item;
    }
    return null;
  }
  createNewCartItemEntry(cart: Cart, cartItem : CartItem){
    const itemList = cart.items;
    cartItem._id = new MoongooseTypes.ObjectId();
    itemList.push(cartItem);
  }
  //number can be negative
  async addAmountToCartItem(cartItem: CartItem, quantity: number){
    cartItem.quantity+=quantity;
    return cartItem.quantity;
  }
}
