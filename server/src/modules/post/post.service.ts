import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Like, Repository } from 'typeorm';
import { Category } from '../category/entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { CreationalPostDto } from './dto/creational-post.dto';
import { User } from '../user/entities/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PagingResponse } from 'src/dto/paging.dto';
import { ImageService } from '../image/image.service';
import { SortPostFields } from './dto/post.dto';

@Injectable()
export class PostService {
  private notFoundResource = new NotFoundException('No Posts Found');
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private imageService: ImageService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createPost(postDto: CreationalPostDto): Promise<Post> {
    const { categoryIds, authorId, ...postData } = postDto;
    const categories = await this.categoryRepository.findBy({
      id: In(categoryIds),
    });

    if (categories.length != postDto.categoryIds.length) {
      throw new NotFoundException('Some categories not found');
    }

    const author = await this.userRepository.findOneBy({ id: authorId });

    const post = this.postRepository.create({
      ...postData,
      categories,
      author,
    });

    const savedPost = await this.postRepository.save(post);

    delete savedPost.author;
    return savedPost;
  }

  async updatePost(id: number, postDto: UpdatePostDto): Promise<void> {
    const post = await this.getOne(id);

    if (postDto.categoryIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(postDto.categoryIds),
      });
      if (categories.length != postDto.categoryIds.length) {
        throw new NotFoundException('Some Categories Not Found');
      }
      post.categories = categories;
    }

    post.title = postDto.title || post.title;

    await this.postRepository.save(post);
  }

  async uploadThumbnail(userId: number, file: Express.Multer.File): Promise<void> {
    const post = await this.postRepository.findOneBy({ id: userId });
    const thumbnail = await this.imageService.uploadImage(file, 'blod/avatar');
    if (post.thumbnail) {
      this.imageService.deleteImage(post.thumbnail.id);
    }
    post.thumbnail = thumbnail;
    await this.postRepository.save(post);
  }


  async deletePost(id: number): Promise<void> {
    const post = await this.postRepository.findOneBy({ id: id });

    if (!post) {
      throw this.notFoundResource;
    }

    await this.postRepository.remove(post);
  }

  async getOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: ['author', 'categories'],
    });
    if (!post) {
      throw this.notFoundResource;
    }
    return post;
  }

  async getBriefOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id: id });

    if (!post) {
      throw this.notFoundResource;
    }
    return post;
  }

  async getAll(pagingRes: PagingResponse<Post>): Promise<PagingResponse<Post>> {
    // const count = await this.postRepository.count();
    //
    // const totalPage =
    //   Math.floor(count / pagingRes.limit) +
    //   (count % pagingRes.limit > 0 ? 1 : 0);
    //
    // const offset = (pagingRes.page - 1) * pagingRes.limit;
    // const posts = await this.postRepository.find({
    //   skip: offset,
    //   take: pagingRes.limit,
    // });
    // pagingRes.totalPage = totalPage;
    // pagingRes.items = posts;
    // return pagingRes;
    const whereCondition: any = pagingRes.query
      ? SortPostFields.map((field) => ({
        [field]: Like(`%${pagingRes.query}%`),
      }))
      : undefined;
    const count = await this.postRepository.count({
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
    const posts = await this.postRepository.find({
      skip: offset,
      take: pagingRes.limit,
      where: whereCondition,
      order: order,
    });
    pagingRes.totalPage = totalPage;
    pagingRes.items = posts;
    return pagingRes;
  }
}
