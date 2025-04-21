import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types';
import Card from '../ui/Card';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <Card 
      className="flex flex-col h-full"
      hoverEffect={true}
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {project.featured && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4 pt-0 mt-auto flex space-x-2">
        {project.githubUrl && (
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label="View GitHub Repository"
          >
            <Github size={20} />
          </a>
        )}
        
        {project.demoUrl && (
          <a 
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label="View Live Demo"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;