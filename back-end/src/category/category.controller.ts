import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
  @Get('/ancestors-detail/:id')
  getAncestors(@Param('id') id: string) {
    return this.categoryService.getAncestorsDetail(id);
  }
  @Get(':id')
  findByID(@Param('id') id: string) {
    return this.categoryService.findByID(id);
  }

  @Get('/id-by-name/:name')
  async getCategoryIdByName(@Param('name') name: string): Promise<{ id: string }> {
    try {
      const id = await this.categoryService.getCategoryIdByName(name);
      return { id };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; 
      }
      throw new Error('An error occurred while fetching the category ID.');
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
