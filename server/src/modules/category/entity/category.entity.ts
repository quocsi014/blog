import { Post } from 'src/modules/post/entity/post.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @ManyToMany(() => Post, (post) => post.categories, { lazy: true })
  @JoinTable({ name: 'categories_posts' })
  posts: Post[];
}
