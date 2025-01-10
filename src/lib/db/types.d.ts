import type { InferModel } from 'drizzle-orm';
import type * as schema from './schema';

export type News = InferModel<typeof schema.news>;
export type Statistics = InferModel<typeof schema.statistics>;
export type Project = InferModel<typeof schema.projects>;
export type Route = InferModel<typeof schema.routes>; 