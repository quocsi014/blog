import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Get,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorators/roles.decorator';
import { CategoryDto, SortCategoryFields } from './dto/category.dto';
import { Category } from './entity/category.entity';
import { Role } from 'src/enum/role.enum';
import { Public } from 'src/decorators/public.decorator';
import { PagingResponse } from 'src/dto/paging.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post()
  @Roles(Role.Admin)
  async create(@Body() categoryDto: CategoryDto): Promise<Category> {
    return await this.categoryService.createCategory(categoryDto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Body() categoryDto: CategoryDto,
    @Param() id: number,
  ): Promise<void> {
    await this.categoryService.updateCategory(id, categoryDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: number): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }

  @Get()
  @Public()
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('query') query: string,
    @Query('sort_by') sortBy: string,
    @Query('asc') ascending: boolean,
  ): Promise<PagingResponse<Category>> {
    const pagingRes = new PagingResponse<Category>(limit, page);
    pagingRes.process();
    pagingRes.ascending = ascending;
    if (SortCategoryFields.includes(sortBy)) {
      pagingRes.sortBy = sortBy;
    }
    pagingRes.query = query;
    return await this.categoryService.getAllCategories(pagingRes);
  }
}
