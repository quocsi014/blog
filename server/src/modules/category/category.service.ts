import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto, SortCategoryFields } from './dto/category.dto';
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
    await this.categoryReposiroty.delete(category.id);
  }

  async getAllCategories(
    pagingRes: PagingResponse<Category>,
  ): Promise<PagingResponse<Category>> {
    const whereCondition: any = pagingRes.query
      ? SortCategoryFields.map((field) => ({
          [field]: Like(`%${pagingRes.query}%`),
        }))
      : undefined;
    const count = await this.categoryReposiroty.count({
      where: whereCondition,
    });

    const totalPage =
      Math.floor(count / pagingRes.limit) +
      (count % pagingRes.limit > 0 ? 1 : 0);

    const offset = (pagingRes.page - 1) * pagingRes.limit;
    const order: any = {};
    if (pagingRes.sortBy) {
      order[pagingRes.sortBy] = pagingRes.ascending ? 'ASC' : 'DESC';
      console.log(pagingRes.sortBy);
    }
    const categories = await this.categoryReposiroty.find({
      skip: offset,
      take: pagingRes.limit,
      where: whereCondition,
      order: order,
    });
    pagingRes.totalPage = totalPage;
    pagingRes.items = categories;
    return pagingRes;
  }
}
