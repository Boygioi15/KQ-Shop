import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';


@Schema()
export class CartItem {
  @Prop({type: Types.ObjectId, unique: true, auto:true, required: true})
  _id: Types.ObjectId;
  @Prop({type: Types.ObjectId, ref: "products", required: true})
  productID: Types.ObjectId;
  @Prop({type: Types.ObjectId, required: true})
  product_typeID: Types.ObjectId;
  @Prop({type: Types.ObjectId, required: true})
  product_type_detailID: Types.ObjectId;
  @Prop({required: true})
  quantity: Number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);