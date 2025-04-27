import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import { BlogPost } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import Button from '../../components/ui/Button';

const BlogAdmin: React.FC = () => {
  const { currentUser } = useAuth();
  const { items: posts, loading, getItems, deleteItem } = useFirestore<BlogPost>('blogPosts');
  const [isDeleting, setIsDeleting] = useState(false);

  // Redirect if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    getItems();
  }, [getItems]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setIsDeleting(true);
      await deleteItem(id);
      setIsDeleting(false);
    }
  };

  // Format date for display
  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Blog Posts
        </h1>
        <Link to="/admin/blog/new">
          <Button variant="primary" size="sm">
            <Plus size={18} className="mr-1" /> New Post
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="animate-pulse p-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 py-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      ) : posts.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {posts.map(post => (
                <tr key={post.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.title}
                    </div>
                    <div className="flex mt-1">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full px-2 py-0.5 text-xs mr-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/admin/blog/edit/${post.id}`}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => post.id && handleDelete(post.id)}
                        disabled={isDeleting}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No blog posts yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Create your first blog post to share your knowledge.
          </p>
          <Link to="/admin/blog/new">
            <Button variant="primary">
              <Plus size={18} className="mr-1" /> Create Blog Post
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogAdmin;