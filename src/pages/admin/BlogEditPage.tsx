import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BlogPost } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import BlogForm from '../../components/blog/BlogForm';

const BlogEditPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getItem, updateItem, loading } = useFirestore<BlogPost>('blogPosts');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Redirect if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const postData = await getItem(postId);
        setPost(postData);
      }
    };

    fetchPost();
  }, [postId, getItem]);

  const handleSubmit = async (data: Partial<BlogPost>) => {
    if (postId) {
      setSubmitLoading(true);

      // Update the updatedAt date
      const postData = {
        ...data,
        updatedAt: new Date()
      };

      const success = await updateItem(postId, postData);
      setSubmitLoading(false);

      if (success) {
        navigate('/admin/blog');
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

  if (!post && !loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-center py-10">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Blog post not found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              The post you're trying to edit doesn't exist or has been deleted.
            </p>
            <Link
              to="/admin/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft size={18} className="mr-1" /> Back to Blog Posts
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
            to="/admin/blog"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <ArrowLeft size={18} className="mr-1" /> Back to Blog Posts
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <BlogForm
            post={post || undefined}
            onSubmit={handleSubmit}
            isLoading={submitLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogEditPage;