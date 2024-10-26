import { Category } from 'src/modules/category/entity/category.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string;

  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @ManyToMany(() => Category, (category) => category.posts, { lazy: true })
  categories: Category[];

  @ManyToOne(() => User, (user) => user.posts, { lazy: true })
  author: User;
}
