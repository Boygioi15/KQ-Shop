import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument } from './category.schema';
import { ProductDocument } from 'src/product/product.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>, // Inject ProductModel
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const newProduct = new this.categoryModel(createCategoryDto);
    return await newProduct.save();
  }

  async findAll() {
    return await this.categoryModel.find();
  }

  async findByID(id: string) {
    return await this.categoryModel.findById(id);
  }
  async getAncestorsDetail(id: string) {
    const ancestorsID = (await this.categoryModel.findById(id)).ancestors;

    const ancestorsDetail = await Promise.all(
      ancestorsID.map(async (id) => {
        return await this.categoryModel.findById(id);
      }),
    );

    //console.log(ancestorsDetail); // Logs the resolved array of results
    return ancestorsDetail; // Returns the resolved results
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryToRemove = await this.categoryModel.findById(id);
    if (!categoryToRemove) {
      throw new Error('Category not found');
    }
    await this.categoryModel.updateMany({ parent: id }, { parent: null });
    return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const categoryToRemove = await this.categoryModel.findById(id);
    if (!categoryToRemove) {
      throw new Error('Category not found');
    }

    // Step 1: Update all categories with parent = id to parent: null
    await this.categoryModel.updateMany({ parent: id }, { parent: null });

    // Step 2: Update all categories that have this id in their ancestors array
    await this.categoryModel.updateMany(
      { ancestors: id },
      { $pull: { ancestors: id } },
    );

    // Step 3: Update all products that reference this category to 'other'
    await this.productModel.updateMany(
      { category: id },
      { categoryRef: '6745cb1bf27948ea5829c919' }, // Assumes 'other' is a valid category ID or string
    );

    // Step 4: Remove the category itself
    await this.categoryModel.findByIdAndDelete(id);
    return { message: 'Category removed successfully' };
  }
}
