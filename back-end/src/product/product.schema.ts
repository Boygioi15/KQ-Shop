import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ trim: true, required: true })
  title: string;

  @Prop({ required: true, lowercase: true, unique: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  /*
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;
  */
  @Prop({ required: true })
  quantity: number;

  @Prop({ default: 0 })
  sold: number;

  @Prop({ type: [String] })
  images: string[];

  @Prop([
    {
      star: Number,
      postedBy: { type: Types.ObjectId, ref: 'Users' },
    },
  ])
  rating: { star: number; postedBy: Types.ObjectId }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
