import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui';
import type { Route } from '../lib/db/types';

interface RouteCardProps {
  route: Route;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  return (
    <Card className="overflow-hidden">
      {route.imageUrl && (
        <div className="relative h-48 w-full">
          <img
            src={route.imageUrl}
            alt={route.name}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            route.type === 'Terrestre'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {route.type}
          </span>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            route.status === 'Operacional'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {route.status}
          </span>
        </div>
        <CardTitle className="mt-2">{route.name}</CardTitle>
        <CardDescription>
          {route.startPoint} → {route.endPoint}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-gray-600 line-clamp-2">{route.description}</p>
          <div className="text-sm text-gray-500">
            Distância: {route.distance}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 