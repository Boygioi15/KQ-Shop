import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemDto } from './dto/cart-add-new-item.dto';
import { updateCartItemAmountDto } from './dto/update-cart-item-amount.dto';
import { SelectCartItemsByShopDto } from './dto/select-cart-items-by-shop.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get('/cart-detail')
  @UseGuards(JwtGuard)
  findCartOfUser(@Request() req) {
    console.log("Checkmark");
    console.log(req.user);
    return this.cartService.getCartDetailOfUser(req.user._id);
  }
  @Post('/items/add-item')
  @UseGuards(JwtGuard)
  addNewItemToCart(@Body() newCartItemDto : CartItemDto, @Request() req){
    return this.cartService.addItemToCartOfUser(req.user._id,newCartItemDto)
  }
  @Put('/items/select-by-shop/:shopId')
  @UseGuards(JwtGuard)
  selectCartItemWithShop(@Param('shopId') shopId: string, @Body() 
    selectCartItemWithShop : SelectCartItemsByShopDto,
    @Request() req
  ){
    return this.cartService.selectCartItemByShopOfUser(req.user._id, shopId, selectCartItemWithShop)
  }
  @Put('/items/select-all')
  @UseGuards(JwtGuard)
  selectAllCartItem(@Body() selectDto : SelectCartItemsByShopDto, @Request() req){
    return this.cartService.selectAllItem(req.user._id, selectDto)
    
  }
  @Delete('/items/:cartItemId/remove-item')
  @UseGuards(JwtGuard)
  removeItemFromCart(@Param('cartItemId') cartItemID: string, @Request() req){
    console.log("HI")
    return this.cartService.removeItemFromCartOfUser(req.user._id,cartItemID)
  }
  @Put('/items/:cartItemId/update-amount')
  @UseGuards(JwtGuard)
  updateCartItemAmount(cartID: string,
    @Param('cartItemId') cartItemID: string, 
    @Body() updateCartItemAmountDto: updateCartItemAmountDto,
    @Request() req
  ){
    return this.cartService.updateItemQuantityInCartOfUser(req.user._id,cartItemID, updateCartItemAmountDto)
  }
  @Put('/items/:cartItemId/toggle-select')
  @UseGuards(JwtGuard)
  toggleSelectCartItem(@Param('cartItemId') cartItemID: string, @Request() req){
    return this.cartService.toggleSelectCartItemOfUser(req.user._id,cartItemID)
  }
  @Put('/clear-cart/:id')
  clearCart(@Param('id')id: string){
    return this.cartService.clearCart(id)
  }
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
    */
}
