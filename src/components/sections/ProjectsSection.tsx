import React from 'react';
import { useProjects } from '../../hooks/useProjects';
import { ProjectCard } from '../ProjectCard';

export default function ProjectsSection() {
  const { projects, loading, error } = useProjects();
  const featuredProjects = projects.slice(0, 3);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-600">
        <p>Erro ao carregar projetos: {error}</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Projetos em Destaque</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
        <div className="text-center mt-8">
          <a href="/projects" className="text-blue-600 font-semibold hover:text-blue-800">
            Ver todos os projetos →
          </a>
        </div>
      </div>
    </section>
  );
} 