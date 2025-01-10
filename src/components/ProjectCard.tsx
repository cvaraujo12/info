import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui';
import { formatDate } from '../lib/utils';
import type { Project } from '../lib/db/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="overflow-hidden">
      {project.imageUrl && (
        <div className="relative h-48 w-full">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.country}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-gray-600 line-clamp-2">{project.description}</p>
          <div className="flex justify-between text-sm">
            <span>Orçamento: {project.budget}</span>
            <span className={`px-2 py-1 rounded-full ${
              project.status === 'Em andamento'
                ? 'bg-blue-100 text-blue-800'
                : project.status === 'Em construção'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {project.status}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            <div>Início: {formatDate(project.startDate)}</div>
            {project.endDate && (
              <div>Conclusão prevista: {formatDate(project.endDate)}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 