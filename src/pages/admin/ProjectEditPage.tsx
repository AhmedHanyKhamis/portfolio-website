import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Project } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import ProjectForm from '../../components/projects/ProjectForm';

const ProjectEditPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getItem, updateItem, loading } = useFirestore<Project>('projects');
  const [project, setProject] = useState<Project | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Redirect if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        const projectData = await getItem(projectId);
        setProject(projectData);
      }
    };

    fetchProject();
  }, [projectId, getItem]);

  const handleSubmit = async (data: Partial<Project>) => {
    if (projectId) {
      setSubmitLoading(true);
      const success = await updateItem(projectId, data);
      setSubmitLoading(false);

      if (success) {
        navigate('/admin/projects');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project && !loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-center py-10">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Project not found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              The project you're trying to edit doesn't exist or has been deleted.
            </p>
            <Link
              to="/admin/projects"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft size={18} className="mr-1" /> Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            to="/admin/projects"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <ArrowLeft size={18} className="mr-1" /> Back to Projects
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Edit Project
          </h1>

          <ProjectForm
            project={project || undefined}
            onSubmit={handleSubmit}
            isLoading={submitLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectEditPage;