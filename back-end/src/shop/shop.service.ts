import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopDocument } from './shop.schema';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel('Shop')
    private readonly shopModel: Model<ShopDocument>,
  ) {}
  async create(createShopDto: CreateShopDto) {
    const newShop = new this.shopModel(createShopDto);
    return await newShop.save();
  }

  async findAll() {
    return await this.shopModel.find();
  }

  async findOne(id: string) {
    return await this.shopModel.findById(id);
  }
  async getShopName(id: string){
    return (await this.findOne(id)).name;
  }
  async update(id: string, updateShopDto: UpdateShopDto) {
    return await this.shopModel.findByIdAndUpdate(id, updateShopDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.shopModel.findByIdAndDelete(id);
  }
}
