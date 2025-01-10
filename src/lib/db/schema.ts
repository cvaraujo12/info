import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Notícias
export const news = sqliteTable('news', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  summary: text('summary').notNull(),
  imageUrl: text('image_url'),
  source: text('source'),
  publishedAt: integer('published_at').notNull(),
  category: text('category').notNull(),
  createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
});

// Estatísticas
export const statistics = sqliteTable('statistics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  country: text('country').notNull(),
  year: integer('year').notNull(),
  investment: real('investment').notNull(),
  projectCount: integer('project_count').notNull(),
  tradeVolume: real('trade_volume').notNull(),
  gdpImpact: real('gdp_impact'),
  employmentImpact: integer('employment_impact'),
  createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
});

// Projetos
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  country: text('country').notNull(),
  status: text('status').notNull(),
  type: text('type').notNull(),
  investment: real('investment'),
  startDate: integer('start_date'),
  endDate: integer('end_date'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  imageUrl: text('image_url'),
  createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
});

// Rotas
export const routes = sqliteTable('routes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  type: text('type').notNull(),
  description: text('description').notNull(),
  countries: text('countries').notNull(),
  length: real('length'),
  status: text('status').notNull(),
  startPoint: text('start_point').notNull(),
  endPoint: text('end_point').notNull(),
  waypoints: text('waypoints'),
  createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
});

// Análises
export const analysis = sqliteTable('analysis', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  summary: text('summary').notNull(),
  author: text('author').notNull(),
  category: text('category').notNull(),
  tags: text('tags'),
  imageUrl: text('image_url'),
  publishedAt: integer('published_at').notNull(),
  createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
}); 