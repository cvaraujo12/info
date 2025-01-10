import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui';
import { formatDate } from '../lib/utils';
import type { News } from '../types/api';

interface NewsCardProps {
  news: News;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <a href={`/news/${news.id}`} className="block">
        {news.imageUrl && (
          <div className="relative h-48 w-full">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
              {news.category}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(news.date)}
            </span>
          </div>
          <CardTitle className="mt-2 hover:text-blue-600 transition-colors duration-200">
            {news.title}
          </CardTitle>
          <CardDescription>
            Por {news.author} • {news.source}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 line-clamp-3">{news.content}</p>
        </CardContent>
      </a>
    </Card>
  );
}; 