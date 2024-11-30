import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import slugify from 'slugify';
import { Model } from 'mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './product.schema';
import {Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    if (createProductDto.name) {
      createProductDto.slug = slugify(createProductDto.name);
    }
    const newProduct = new this.productModel(createProductDto);
    newProduct.types.forEach(element => {
      element._id = new Types.ObjectId();
      element.details.forEach(element1 => {
        element1._id = new Types.ObjectId();
      })
    })
    return await newProduct.save();
  }

  async findAllByCategory(categoryID: string) {
    return await this.productModel.find({ categoryRef: categoryID });
  }
  async findAll() {
    return await this.productModel.find();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    product.types.forEach(element => {
      console.log(element._id);
      /*
      element.details.forEach(element1 => {
        console.log(element1._id)
      })
        */
    })
    return await this.productModel.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
