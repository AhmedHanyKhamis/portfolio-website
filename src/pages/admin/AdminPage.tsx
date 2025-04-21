import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { PenSquare, BookOpen, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const AdminPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects');
  
  // Redirect if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <div>
          {activeTab === 'projects' && (
            <Link to="/admin/projects/new">
              <Button variant="primary" size="sm">
                <Plus size={16} className="mr-1" /> New Project
              </Button>
            </Link>
          )}
          {activeTab === 'blog' && (
            <Link to="/admin/blog/new">
              <Button variant="primary" size="sm">
                <Plus size={16} className="mr-1" /> New Post
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              <div className="flex items-center">
                <PenSquare size={18} className="mr-2" />
                Projects
              </div>
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'blog'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('blog')}
            >
              <div className="flex items-center">
                <BookOpen size={18} className="mr-2" />
                Blog
              </div>
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'projects' ? (
        <Link to="/admin/projects" className="block">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Manage Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Add, edit, or delete your portfolio projects.
            </p>
          </div>
        </Link>
      ) : (
        <Link to="/admin/blog" className="block">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Manage Blog Posts
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Create, edit, or delete your blog content.
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default AdminPage;