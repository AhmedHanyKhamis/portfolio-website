import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Project } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import ProjectForm from '../../components/projects/ProjectForm';

const ProjectCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addItem } = useFirestore<Project>('projects');
  const [submitLoading, setSubmitLoading] = useState(false);

  // Redirect if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (data: Partial<Project>) => {
    setSubmitLoading(true);

    // Set creation date
    const projectData = {
      ...data,
      createdAt: new Date()
    };

    const result = await addItem(projectData as Omit<Project, 'id'>);
    setSubmitLoading(false);

    if (result) {
      navigate('/admin/projects');
    }
  };

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
            Create New Project
          </h1>

          <ProjectForm
            onSubmit={handleSubmit}
            isLoading={submitLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCreatePage;