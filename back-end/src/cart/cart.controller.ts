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
  Request
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
    return this.cartService.findCartOfUser(req.user._id);
  }
  @Post('/:cartId/items/add-item')
  addNewItemToCart(@Param('cartId') id: string, @Body() newCartItemDto : CartItemDto){
    return this.cartService.addItemToCart(id,newCartItemDto)
  }
  @Put('/:cartId/items/select-by-shop/:shopId')
  selectCartItemWithShop(@Param('cartId') cartId: string, @Param('shopId') shopId: string, @Body() selectCartItemWithShop : SelectCartItemsByShopDto){
    return this.cartService.selectCartItemByShop(cartId, shopId, selectCartItemWithShop)
  }
  @Put('/:cartId/items/select-all')
  selectAllCartItem(@Param('cartId') cartId: string,@Body() selectDto : SelectCartItemsByShopDto){
    return this.cartService.selectAllItem(cartId, selectDto)
    
  }
  @Delete('/:cartId/items/:cartItemId/remove-item')
  removeItemFromCart(@Param('cartId') cartID: string,@Param('cartItemId') cartItemID: string){
    return this.cartService.removeItemFromCart(cartID,cartItemID)
  }
  @Put('/:cartId/items/:cartItemId/update-amount')
  updateCartItemAmount(@Param('cartId') cartID: string,@Param('cartItemId') cartItemID: string, @Body() updateCartItemAmountDto: updateCartItemAmountDto){
    return this.cartService.updateItemQuantityInCart(cartID,cartItemID, updateCartItemAmountDto)
  }
  @Put('/:cartId/items/:cartItemId/toggle-select')
  toggleSelectCartItem(@Param('cartId') cartID: string,@Param('cartItemId') cartItemID: string){
    return this.cartService.toggleSelectCartItem(cartID,cartItemID)
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
