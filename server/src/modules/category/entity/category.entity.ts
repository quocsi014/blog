import { Expose } from 'class-transformer';
import { Post } from 'src/modules/post/entity/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  createdAt: Timestamp;

  @ManyToMany(() => Post, (post) => post.categories, { lazy: true })
  @JoinTable({ name: 'categories_posts' })
  posts: Post[];
}
