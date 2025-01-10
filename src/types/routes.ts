export interface Route {
  id: number;
  name: string;
  type: 'Terrestre' | 'Marítima';
  startPoint: string; // formato: "latitude,longitude"
  endPoint: string; // formato: "latitude,longitude"
  startCity: string;
  endCity: string;
  startCountry: string;
  endCountry: string;
  distance: number;
  description: string;
  createdAt: string;
  updatedAt: string;
} 