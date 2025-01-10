import type { InferModel } from 'drizzle-orm';
import { news, statistics, projects, routes, analysis } from './schema';

// Tipos inferidos das tabelas
export type News = InferModel<typeof news, 'select'>;
export type NewsInsert = InferModel<typeof news, 'insert'>;

export type Statistics = InferModel<typeof statistics, 'select'>;
export type StatisticsInsert = InferModel<typeof statistics, 'insert'>;

export type Project = InferModel<typeof projects, 'select'>;
export type ProjectInsert = InferModel<typeof projects, 'insert'>;

export type Route = InferModel<typeof routes, 'select'>;
export type RouteInsert = InferModel<typeof routes, 'insert'>;

export type Analysis = InferModel<typeof analysis, 'select'>;
export type AnalysisInsert = InferModel<typeof analysis, 'insert'>;

// Enums para tipos específicos
export enum ProjectStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum ProjectType {
  INFRASTRUCTURE = 'infrastructure',
  ENERGY = 'energy',
  TRANSPORT = 'transport',
  TECHNOLOGY = 'technology',
  INDUSTRIAL = 'industrial'
}

export enum RouteType {
  LAND = 'land',
  SEA = 'sea',
  RAIL = 'rail',
  AIR = 'air',
  MIXED = 'mixed'
}

export enum RouteStatus {
  OPERATIONAL = 'operational',
  UNDER_CONSTRUCTION = 'under_construction',
  PLANNED = 'planned'
}

export enum NewsCategory {
  ECONOMY = 'economy',
  POLITICS = 'politics',
  INFRASTRUCTURE = 'infrastructure',
  TECHNOLOGY = 'technology',
  ENVIRONMENT = 'environment'
}

export enum AnalysisCategory {
  ECONOMIC = 'economic',
  GEOPOLITICAL = 'geopolitical',
  ENVIRONMENTAL = 'environmental',
  SOCIAL = 'social',
  TECHNOLOGICAL = 'technological'
} 