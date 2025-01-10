import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui';
import { formatDate } from '../lib/utils';
import type { Statistics } from '../lib/db/types';

interface StatisticsCardProps {
  statistics: Statistics;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({ statistics }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800">
            {statistics.category}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(statistics.date)}
          </span>
        </div>
        <CardTitle className="mt-2 text-3xl font-bold">
          {statistics.value} {statistics.unit}
        </CardTitle>
        <CardDescription>
          {statistics.country} • {statistics.source}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{statistics.description}</p>
      </CardContent>
    </Card>
  );
}; 