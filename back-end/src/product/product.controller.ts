import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  @Get('brief')
  findAll_Brief(){
    return this.productService.findAll_Brief();
  }
  @Get('brief/search/:content')
  findAll_Search_Brief(@Param('content') content: string){
    return this.productService.findAll_Search_Brief(content);
  }
  @Get('modal/:id')
  findOne_Modal(@Param('id') id: string){
    return this.productService.findOne_Modal(id);
  }
  @Get()
  findAll(@Query('isPublished') isPublished?: string) {
    const isPublishedBool = isPublished ? isPublished === 'true' : undefined;
    return this.productService.findAll(isPublishedBool);
  }
  @Get()
  findAllProductWithCategoryID(@Query('categoryID') categoryID: string) {
    return this.productService.findAllByCategory(categoryID);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }
  @Patch(":/id/mark-stop")
  markProductStopped(@Param('id') id: string){
    return this.productService.markProductStopped(id);
  }
  @Patch(":/id/mark-continue")
  markProductContinue(@Param('id') id: string){
    return this.productService.markProductContinue(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
