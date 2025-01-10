export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface News {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  source: string;
  category: string;
  imageUrl?: string;
}

export interface Statistics {
  id: number;
  label: string;
  value: number;
  change: number;
  period: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'planned' | 'in_progress' | 'completed';
  budget: number;
  startDate: string;
  endDate?: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Route {
  id: number;
  name: string;
  description: string;
  type: 'land' | 'sea' | 'air';
  points: Array<{
    lat: number;
    lng: number;
  }>;
} 