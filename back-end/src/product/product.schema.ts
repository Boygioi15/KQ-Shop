import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type ProductDocument = Product & Document;


@Schema()
class Product_Types_Detail {
  @Prop({type: Types.ObjectId, unique: true, auto:true, required: true})
  _id: Types.ObjectId;
  @Prop({ required: true })
  size_name: string
  @Prop()
  size_moreInfo: string

  @Prop({required: true})
  price: Number
  @Prop({required: true, default: 0})
  sold: Number
  @Prop({required: true})
  inStorage: Number
  //not yet
  @Prop()
  sku: string;
}
@Schema()
class Product_Types{
    @Prop({type: Types.ObjectId, auto: true, unique: true, required: true})
    _id: Types.ObjectId;
    @Prop({required: true})
    color_name: string;
    @Prop({ type: [String], required: true })
    color_ImageURL: string[];

    @Prop({required: true})
    details: [Product_Types_Detail]
}
@Schema({ timestamps: true, collection: 'products' })
export class Product {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ required: true, lowercase: true, unique: true })
  slug: string;

  @Prop()
  init_ThumnbnailURL: string;
  @Prop()
  hover_ThumnbnailURL: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'categories' })
  categoryRef: Types.ObjectId;

  @Prop({ type: [Product_Types], required: true })
  types: Product_Types[]; // Each type will have its own _id
  @Prop({ type: Types.ObjectId, ref: 'reviews' })
  reviewsRef: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
