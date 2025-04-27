import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react';
import { Project } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import Button from '../components/ui/Button';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getItem, loading } = useFirestore<Project>('projects');
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        const projectData = await getItem(projectId);
        setProject(projectData);
      }
    };

    fetchProject();
  }, [projectId, getItem]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/projects">
            <Button variant="primary">
              <ArrowLeft size={18} className="mr-2" /> Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Projects
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full px-3 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-6 flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <Calendar size={16} className="mr-1" />
          <span>{formatDate(project.createdAt)}</span>
        </div>

        <div className="rounded-lg overflow-hidden mb-8 shadow-lg">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="prose dark:prose-invert max-w-none mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <Github size={18} className="mr-2" /> View Source
              </Button>
            </a>
          )}

          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                <ExternalLink size={18} className="mr-2" /> Live Demo
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;