import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes, ObjectId } from 'mongoose';
import { Types } from 'twilio/lib/rest/content/v1/content';

export type UserDocument = User & Document;

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  thumbnailURL: string;

  @Prop()
  thumbnail_PublicID: string;

  @Prop()
  addresses: string;

  @Prop()
  birthDate: Date;

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
