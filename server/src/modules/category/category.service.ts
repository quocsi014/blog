import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from './dto/category.dto';
import { PagingResponse } from 'src/dto/paging.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryReposiroty: Repository<Category>,
  ) {}
  async createCategory(categoryDto: CategoryDto): Promise<Category> {
    const savedCategory = await this.categoryReposiroty.save(categoryDto);
    return savedCategory;
  }

  async updateCategory(id: number, categoryDto: CategoryDto): Promise<void> {
    const category = await this.categoryReposiroty.findOneBy({ id: id });
    if (!category) {
      throw new NotFoundException('No Categories Found');
    }
    category.name = categoryDto.name;
    await this.categoryReposiroty.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryReposiroty.findOneBy({ id: id });
    if (!category) {
      throw new NotFoundException('No Categories Found');
    }
    await this.categoryReposiroty.delete(category);
  }

  async getAllCategories(
    pagingRes: PagingResponse<Category>,
  ): Promise<PagingResponse<Category>> {
    const count = await this.categoryReposiroty.count();

    const totalPage =
      Math.floor(count / pagingRes.limit) +
      (count % pagingRes.limit > 0 ? 1 : 0);

    const offset = (pagingRes.page - 1) * pagingRes.limit;
    console.log(pagingRes);
    const categories = await this.categoryReposiroty.find({
      skip: offset,
      take: pagingRes.limit,
    });
    pagingRes.totalPage = totalPage;
    pagingRes.items = categories;
    return pagingRes;
  }
}
