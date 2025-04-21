import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import Button from '../components/ui/Button';

const BlogDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { getItem, loading } = useFirestore<BlogPost>('blogPosts');
  const [post, setPost] = useState<BlogPost | null>(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const postData = await getItem(postId);
        setPost(postData);
      }
    };
    
    fetchPost();
  }, [postId, getItem]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
            <div className="flex gap-4 mb-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
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
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Blog post not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog">
            <Button variant="primary">
              <ArrowLeft size={18} className="mr-2" /> Back to Blog
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
  
  // Calculate read time (very basic estimation)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime > 0 ? readTime : 1; // Minimum 1 minute
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Blog
        </Link>
        
        <article>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full px-3 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-8">
            <div className="flex items-center mr-4">
              <Calendar size={16} className="mr-1" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{calculateReadTime(post.content)} min read</span>
            </div>
          </div>
          
          {post.imageUrl && (
            <div className="rounded-lg overflow-hidden mb-8 shadow-lg">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          <div className="prose dark:prose-invert max-w-none mb-10">
            <div className="whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailPage;