import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
    User = 'user',
    Admin = 'admin',
}

@Schema()
export class User {
  @Prop({ required: true }) 
  name: string;

  @Prop({ unique: true }) 
  email: string;
  
  @Prop({}) 
  password: string;

  @Prop({}) 
  phone: string;
  
  @Prop() 
  image: string;

  @Prop({ default: Role.User, enum: [Role.Admin, Role.User] }) 
  role: string;

  @Prop({ default: false }) 
  isSeller: boolean;

  @Prop()
  address: string;

  @Prop({ unique: true, sparse: true }) 
  googleId?: string;

  @Prop({ unique: true, sparse: true }) 
  facebookId?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
