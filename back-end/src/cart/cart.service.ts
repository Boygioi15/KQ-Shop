import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart, CartItem, CartDocument } from './cart.schema';
import { ProductService } from 'src/product/product.service';
import { ProductIdentifier } from 'src/product/product.productIdentifier';

import {Types as MoongooseTypes} from 'mongoose'
import { CartItemDto } from './dto/cart-add-new-item.dto';
import { updateCartItemAmountDto } from './dto/update-cart-item-amount.dto';
import { UserService } from 'src/user/user.service';
import { reduce } from 'rxjs';
@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart')
    private readonly cartModel: Model<CartDocument>,
    private readonly productService: ProductService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}
  async createWithUserRef(local_anonymous_cartID: string = null) {
    const newCart = new this.cartModel();
    //add item from local_anonymous cart
    if(local_anonymous_cartID){
      
    }
    await newCart.save();
    return newCart.id;
  }
  async findAll() {
    return await this.cartModel.find();
  }
  async findOne(cartID: string){
    return await this.cartModel.findById(cartID);
  }
  async findCartOfUser(userId: string) {
    console.log("Cart of user: ");
    console.log(userId);
    const user = await this.userService.getUserDetail(userId);
    const cartRef = user.cartRef;
    const cartDetail = await this.findOne(cartRef.toString());
    return cartDetail;
  }
  async getCartDetailOfUser(userId: string){
    const cart = await this.findCartOfUser(userId);
    console.log("Cart detail: ");
    return await this.getCartDetail(cart);
  }
  async getCartDetail(cart: Cart){
    let numberOfItem = 0;
    let rootPrice = 0;
    let promotionDiscount = 0;
    let voucherDiscount = 0;
    const cartItemList = await Promise.all(cart.items.map(async (cartItem) => {
      const productIdentitier: ProductIdentifier = {
        productID: cartItem.productRef.toString(),
        product_typeID: cartItem.product_typeRef.toString(),
        product_type_detailID: cartItem.product_type_detailRef.toString()
      }
      const itemDetail = await this.productService.getProductDetailInformation(productIdentitier)
      console.log("Item detail: ")
      //console.log(itemDetail)
      numberOfItem+=cartItem.quantity;
      if(cartItem.selected){
        rootPrice+=(+itemDetail.productTypeDetailPrice)*cartItem.quantity;
      }
      
      return {
        _id: cartItem._id,
        ...itemDetail,
        ...cartItem._doc, 
      }
    }));
    console.log("Plain item list: ");
    //console.log(cartItemList);
    //group by shop:
    // Group by shopRef
    const groupedByShop = new Map<string, any>();

    for (const item of cartItemList) {
      const { shopRef, shopName } = item; // Assuming `shopRef` and `shopName` are part of itemDetail
      if (!groupedByShop.has(shopRef)) {
        groupedByShop.set(shopRef, { shopRef, shopName, itemList: [] });
      }
      groupedByShop.get(shopRef)!.itemList.push(item);
    }

    // Convert the Map to an array
    const shopGroup = Array.from(groupedByShop.values());
    console.log(numberOfItem)
    shopGroup.forEach((cartShop)=>{
      cartShop.selected = cartShop.itemList.every(item=>item.selected)
    })
    //console.log("Grouped by shop:");
    //console.log(shopGroup);
    const discountedPrice = rootPrice - promotionDiscount - voucherDiscount;
    const result = {
      rootPrice: rootPrice,
      promotionDiscount: promotionDiscount,
      voucherDiscount: voucherDiscount,
      discountedPrice: discountedPrice,
      numberOfItem: numberOfItem,
      selected: shopGroup.every(group=>group.selected),
      shopGroup: shopGroup
    }
    console.log("Cart detail: ");
    console.log(result)
    return result
  }
  async addItemToCartOfUser(
    userID: string,
    newCartItemDto : CartItemDto
  ) {
    const cart = await this.findCartOfUser(userID);
    const {productIdentifier, quantity} = newCartItemDto;

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
    console.log("Check in storage: ");
    console.log("Enough: ", enough);
    console.log("In storage: ", inStorage);
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
    return this.update(cart._id.toString(),cart);
  }
  async clearCart(cartID: string){
    const cart = await this.findOne(cartID)
    cart.items = [];
    return this.update(cartID,cart)
  }
  async update(id: string, cart: Cart) {
    const newCart = await this.cartModel.findByIdAndUpdate(id, cart, {new: true});
    return {
      success: true
    };
  }
  remove(id: string) {
    return `This action removes a #${id} cart`;
  }

  async removeItemFromCartOfUser(userId: string, cartItemID: string){
    const cart = await this.findCartOfUser(userId)
    cart.items = cart.items.filter((element) => {
      return element._id.toString() !== cartItemID
    })
    return await this.update(cart._id.toString(),cart)
  }
  async updateItemQuantityInCartOfUser(userId: string, cartItemID: string, updateCartItemAmountDto: updateCartItemAmountDto){
    const cart = await this.findCartOfUser(userId);
    const item = this.getCartItemInCart(cart,cartItemID);
    if(!item){
      throw new Error("There is no item alike in cart !")
    }
    const quantity = updateCartItemAmountDto.quantity;
    let _quantity = quantity;
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
    return this.update(cart._id.toString(), cart);
  }

  async toggleSelectCartItemOfUser(userId: string, cartItemID: string){
    const cart = await this.findCartOfUser(userId)
    const item = this.getCartItemInCart(cart,cartItemID);
    if(!item){
      throw new Error("There is no item alike in cart !")
    }
    item.selected = !item.selected;
    return await this.update(cart._id.toString(), cart)
  }
  async selectCartItemByShopOfUser(userId: string, shopID: string, selectCartItemByShop) {
    const cart = await this.findCartOfUser(userId);
    const selected = selectCartItemByShop.select;
  
    for (const element of cart.items) {
      const productDetail = await this.productService.findOne(element.productRef.toString());
      if (productDetail.shopRef.toString() === shopID) {
        element.selected = selected; // Update the field
      }
    }
  
    return this.update(cart._id.toString(), cart);
  }
  async selectAllItem(userId: string, selectDto) {
    const cart = await this.findCartOfUser(userId);
    const selected = selectDto.select;
  
    for (const element of cart.items) {
      element.selected = selected; 
    }
    return this.update(cart._id.toString(), cart);
  }





  getCartItemInCart(cart: Cart, cartItemID: string) : CartItem {
    return cart.items.find((element)=> element._id.toString()===cartItemID)
  }
  async checkIfItemAlreadyExisted(cart: Cart, productIdentifier: ProductIdentifier) : Promise<CartItem> {
    if(!cart || !cart.items){
      return null;
    }
    const item = cart.items.find((element) => {
        return element.productRef.toString() === productIdentifier.productID &&
        element.product_typeRef.toString() === productIdentifier.product_typeID &&
        element.product_type_detailRef.toString() === productIdentifier.product_type_detailID
    });
    console.log("Find item?:")
    console.log(item)
    if(item){
      return item;
    }
    return null;
  }
  createNewCartItemEntry(cart: Cart, cartItem : CartItem){
    cartItem._id = new MoongooseTypes.ObjectId();
    if(!cart.items){
      cart.items = [];
    }
    cart.items.push(cartItem);
  }
  //number can be negative
  async addAmountToCartItem(cartItem: CartItem, quantity: number){
    
    cartItem.quantity+=quantity;
    console.log("Add quantity to cart item");
    console.log(cartItem.quantity)
    return cartItem.quantity;
  }
}
