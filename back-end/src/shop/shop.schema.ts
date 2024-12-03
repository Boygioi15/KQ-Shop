import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShopDocument = Shop & Document;

@Schema({ collection: 'shops' })
export class Shop {
  @Prop({ required: true })
  name: string;

  @Prop()
  logoURL: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true, index: true })
  contactEmail: string;

  @Prop({ required: true, unique: true })
  contactPhone: string;

  @Prop({ type: Types.ObjectId, ref: 'users', required: true })
  userRef: string;

  @Prop({ default: false })
  deleted: boolean;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
