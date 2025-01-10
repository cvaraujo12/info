import { pgTable, text, integer, decimal, timestamp, serial } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Notícias
export const news = pgTable('news', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  summary: text('summary').notNull(),
  imageUrl: text('image_url'),
  source: text('source'),
  publishedAt: timestamp('published_at').notNull(),
  category: text('category').notNull(),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Estatísticas
export const statistics = pgTable('statistics', {
  id: serial('id').primaryKey(),
  country: text('country').notNull(),
  year: integer('year').notNull(),
  investment: decimal('investment', { precision: 15, scale: 2 }).notNull(),
  projectCount: integer('project_count').notNull(),
  tradeVolume: decimal('trade_volume', { precision: 15, scale: 2 }).notNull(),
  gdpImpact: decimal('gdp_impact', { precision: 5, scale: 2 }),
  employmentImpact: integer('employment_impact'),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Projetos
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  country: text('country').notNull(),
  city: text('city'),
  status: text('status').notNull(),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  budget: decimal('budget', { precision: 15, scale: 2 }),
  progress: decimal('progress', { precision: 5, scale: 2 }),
  contractor: text('contractor'),
  sector: text('sector').notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Rotas
export const routes = pgTable('routes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  startPoint: text('start_point').notNull(),
  endPoint: text('end_point').notNull(),
  distance: decimal('distance', { precision: 10, scale: 2 }).notNull(),
  transportType: text('transport_type').notNull(),
  status: text('status').notNull(),
  completionDate: timestamp('completion_date'),
  investment: decimal('investment', { precision: 15, scale: 2 }),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Análises
export const analysis = pgTable('analysis', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  summary: text('summary').notNull(),
  author: text('author').notNull(),
  category: text('category').notNull(),
  sector: text('sector'),
  region: text('region'),
  publishedAt: timestamp('published_at').notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});