import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import slugify from 'slugify';
import { Model } from 'mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './product.schema';
import { Types } from 'mongoose';
import { ProductIdentifier } from './product.productIdentifier';
import { BriefProductInterface } from './interfaces/product.brief';
import { ShopService } from 'src/shop/shop.service';
import { ModalProductInterface } from './interfaces/product.modal';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    private readonly shopService: ShopService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    if (createProductDto.name) {
      createProductDto.slug = slugify(createProductDto.name);
    }

    const newProduct = new this.productModel({
      ...createProductDto,
      details: createProductDto.attributes, 
    });

    newProduct.types.forEach((type) => {
      type._id = new Types.ObjectId();
      type.details.forEach((detail) => {
        detail._id = new Types.ObjectId();
      });
    });
    return await newProduct.save();
  }

  async findAllByCategory(categoryID: string) {
    return await this.productModel.find({ categoryRef: categoryID });
  }
  async findAll_Brief(): Promise<BriefProductInterface[]> {
    const products = await this.productModel.find();
    return Promise.all(
      products.map(async (product) => {
        const price = await this.getDisplayPrice(product.id);
        const shopName = (await this.shopService.findOne(product.shopRef.toString())).name;
        return {
          id: product._id.toString(),
          name: product.name,
          shop: shopName,
          price: price,
          initImgURL: product.init_ThumbnailURL,
          hoverImgURL: product.hover_ThumbnailURL,
        };
      })
    );
  }
  async findOne_Modal(id: string): Promise<ModalProductInterface> {
    const product = await this.productModel.findById(id);
    return {
      id: product._id.toString(),
      name: product.name,
      shopId: product.shopRef.toString(),
      shopName: await this.shopService.getShopName(product.shopRef.toString()),

      ratingsCount: Math.random()*4+1,
      reviewsCount: Math.random()*100,
      types: product.types
    }
  }
  async findAll_Search_Brief(search: string) : Promise<BriefProductInterface[]> {
    const products = await this.productModel.find({
      name: { $regex: search, $options: "i" }, // Adjust `name` to match your actual field
    });
    return Promise.all(
      products.map(async (product) => {
        const price = await this.getDisplayPrice(product.id);
        const shopName = (await this.shopService.findOne(product.shopRef.toString())).name;
        return {
          id: product._id.toString(),
          name: product.name,
          shop: shopName,
          price: price,
          initImgURL: product.init_ThumbnailURL,
          hoverImgURL: product.hover_ThumbnailURL,
        };
      })
    );
  }
  async findAll(isPublished?: boolean) {
    if (isPublished === undefined) {
      return await this.productModel.find();
    }
    return await this.productModel.find({ isPublished: isPublished });
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
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

  async checkIfThereIsEnoughInStorage(
    productIdentifier: ProductIdentifier,
    quantity: Number,
  ) : Promise<{enough, inStorage}>{
    const product = await this.productModel.findById(
      productIdentifier.productID,
    );
    const product_types = product.types;
    const product_type = product_types.find(
      (element) => element._id.toString() === productIdentifier.product_typeID,
    );
    const product_type_details = product_type.details;
    const product_type_detail = product_type_details.find(
      (element) =>
        element._id.toString() === productIdentifier.product_type_detailID,
    );

    const inStorage = product_type_detail.inStorage;
    if (inStorage < quantity) {
      return { enough: false, inStorage: inStorage };
    } else {
      return { enough: true, inStorage: inStorage };
    }
  }
  async getDisplayPrice(productID: string){
    const product = await this.productModel.findById(productID);
    const productPriceFirst = product.types[0].details[0].price;
    return productPriceFirst;
  }
}
