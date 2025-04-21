import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BlogPost } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import BlogForm from '../../components/blog/BlogForm';

const BlogCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addItem } = useFirestore<BlogPost>('blogPosts');
  const [submitLoading, setSubmitLoading] = useState(false);
  
  // Redirect if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  const handleSubmit = async (data: Partial<BlogPost>) => {
    setSubmitLoading(true);
    
    const now = new Date();
    
    // Set creation and update dates
    const postData = {
      ...data,
      createdAt: now,
      updatedAt: now
    };
    
    const result = await addItem(postData as Omit<BlogPost, 'id'>);
    setSubmitLoading(false);
    
    if (result) {
      navigate('/admin/blog');
    }
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link 
            to="/admin/blog" 
            className="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <ArrowLeft size={18} className="mr-1" /> Back to Blog Posts
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <BlogForm
            onSubmit={handleSubmit}
            isLoading={submitLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCreatePage;