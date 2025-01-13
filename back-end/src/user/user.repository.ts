import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly cartService: CartService
  ) {}

  async findOne(query: any) {
    return await this.userModel.findOne(query);
  }

  async find(query: any) {
    return await this.userModel.find(query);
  }

  async create(data: Record<string, any>) {
    const user = await this.userModel.create(data);
    //console.log("Checkmark1")
    const associatedCartId = await this.cartService.createWithUserRef();
    //console.log(associatedCartId);
    user.cartRef = associatedCartId;
    user.save();
    //console.log("Checkmark2")
    return user;
  }

  async updateOne(query: any, data: Record<string, any>) {
    return await this.userModel.updateOne(query, data);
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }
}
