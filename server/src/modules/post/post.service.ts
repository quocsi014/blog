import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Category } from '../category/entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { CreationalPostDto } from './dto/creational-post.dto';
import { User } from '../user/entities/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PagingResponse } from 'src/dto/paging.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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
    post.content = postDto.content || post.content;
    post.thumbnailUrl = postDto.thumbnailUrl || post.thumbnailUrl;

    await this.postRepository.save(post);
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.postRepository.findOneBy({ id: id });

    if (!post) {
      throw new NotFoundException('No Posts Found');
    }

    await this.postRepository.remove(post);
  }

  async getOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: ['author', 'categories'],
    });
    if (!post) {
      throw new NotFoundException('No Posts Found');
    }
    return post;
  }

  async getAll(pagingRes: PagingResponse<Post>): Promise<PagingResponse<Post>> {
    const count = await this.postRepository.count();

    const totalPage =
      Math.floor(count / pagingRes.limit) +
      (count % pagingRes.limit > 0 ? 1 : 0);

    const offset = (pagingRes.page - 1) * pagingRes.limit;
    const posts = await this.postRepository.find({
      skip: offset,
      take: pagingRes.limit,
    });
    pagingRes.totalPage = totalPage;
    pagingRes.items = posts;
    return pagingRes;
  }
}
