// Content Collections 配置和类型定义
import { defineCollection, z } from 'astro:content';

// 游戏集合 Schema
const gamesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    platform: z.string(),
    rating: z.number().min(1).max(5),
    completedDate: z.string(),
    status: z.enum(['已完成', '进行中', '已放弃']),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    playTime: z.number().optional(),
    favorite: z.boolean().optional(),
  }),
});

// 电影集合 Schema
const moviesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    director: z.string(),
    year: z.number(),
    rating: z.number().min(1).max(5),
    watchDate: z.string(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    favorite: z.boolean().optional(),
  }),
});

// 书籍集合 Schema
const booksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    rating: z.number().min(1).max(5),
    readDate: z.string(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    favorite: z.boolean().optional(),
  }),
});

// 导出所有集合
export const collections = {
  games: gamesCollection,
  movies: moviesCollection,
  books: booksCollection,
};
