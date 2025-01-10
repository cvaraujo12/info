import { z } from 'zod';

// News validation schema
export const newsSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  summary: z.string().min(1).max(500),
  imageUrl: z.string().url().optional(),
  source: z.string().optional(),
  publishedAt: z.number(),
  category: z.string(),
});

// Statistics validation schema
export const statisticsSchema = z.object({
  country: z.string().min(1),
  year: z.number().min(2000).max(2100),
  investment: z.number().positive(),
  projectCount: z.number().nonnegative(),
  tradeVolume: z.number().positive(),
  gdpImpact: z.number().optional(),
  employmentImpact: z.number().optional(),
});

// Projects validation schema
export const projectSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1),
  country: z.string().min(1),
  status: z.enum(['planned', 'in_progress', 'completed', 'cancelled']),
  type: z.string(),
  investment: z.number().positive().optional(),
  startDate: z.number().optional(),
  endDate: z.number().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  imageUrl: z.string().url().optional(),
});

// Routes validation schema
export const routeSchema = z.object({
  name: z.string().min(1).max(200),
  type: z.enum(['land', 'sea', 'air', 'mixed']),
  description: z.string().min(1),
  countries: z.string().min(1),
  length: z.number().positive().optional(),
  status: z.enum(['planned', 'in_progress', 'completed']),
  startPoint: z.string().min(1),
  endPoint: z.string().min(1),
  waypoints: z.string().optional(),
});

// Analysis validation schema
export const analysisSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  summary: z.string().min(1).max(500),
  author: z.string().min(1),
  category: z.string(),
  tags: z.string().optional(),
  imageUrl: z.string().url().optional(),
  publishedAt: z.number(),
});

export const validate = {
  news: (data: unknown) => newsSchema.parse(data),
  statistics: (data: unknown) => statisticsSchema.parse(data),
  project: (data: unknown) => projectSchema.parse(data),
  route: (data: unknown) => routeSchema.parse(data),
  analysis: (data: unknown) => analysisSchema.parse(data),
}; 