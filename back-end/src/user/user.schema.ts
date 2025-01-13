import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes, ObjectId } from 'mongoose';
import { Types } from 'twilio/lib/rest/content/v1/content';

export type UserDocument = User & Document;

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Schema()
class Address{
  @Prop({ type: MongooseTypes.ObjectId, auto: true, required: true })
  _id: MongooseTypes.ObjectId;
  
  @Prop({required: true})
  receiverName: String;

  @Prop({required: true})
  receiverPhone: String;

  @Prop({required: true})
  receiverAddress: String;

  @Prop({required: true})
  default: boolean;
}
@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  thumbnailURL: string;

  @Prop()
  thumbnail_PublicID: string;

  @Prop({type: [Address], default: []})
  addresses: Address[];

  @Prop()
  birthDate: Date;

  @Prop()
  gender: String;
  
  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop({ unique: true, sparse: true})
  phone?: string;

  @Prop({ unique: true, sparse: true })
  account?: string;

  @Prop()
  password?: string;

  @Prop({ default: false })
  isSeller: boolean;

  @Prop({ type: MongooseTypes.ObjectId, ref: 'carts' })
  cartRef: ObjectId;

  @Prop({ unique: true, sparse: true })
  googleId?: string;

  @Prop({ unique: true, sparse: true })
  facebookId?: string;

  @Prop()
  role: Role;
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
