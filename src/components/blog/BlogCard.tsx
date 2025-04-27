import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../../types';
import Card from '../ui/Card';

interface BlogCardProps {
  post: BlogPost;
  onClick?: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
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

  // Calculate read time (very basic estimation)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime > 0 ? readTime : 1; // Minimum 1 minute
  };

  return (
    <Card
      className="flex flex-col h-full"
      hoverEffect={true}
      onClick={onClick}
    >
      {post.imageUrl && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-6 flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {post.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center mr-4">
            <Calendar size={16} className="mr-1" />
            <span>{formatDate(post.createdAt)}</span>
          </div>

          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{calculateReadTime(post.content)} min read</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;