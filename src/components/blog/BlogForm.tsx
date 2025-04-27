import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BlogPost } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';

interface BlogFormProps {
  post?: BlogPost;
  onSubmit: (data: Partial<BlogPost>) => void;
  isLoading: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({
  post,
  onSubmit,
  isLoading
}) => {
  const isEditing = !!post;
  const [previewMode, setPreviewMode] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Partial<BlogPost>>({
    defaultValues: post || {
      title: '',
      content: '',
      excerpt: '',
      imageUrl: '',
      tags: [],
      published: false
    }
  });

  const watchContent = watch('content', '');

  const processFormData = (data: Partial<BlogPost>) => {
    // Convert comma-separated tags string to array
    if (typeof data.tags === 'string') {
      data.tags = (data.tags as string).split(',').map(tag => tag.trim());
    }

    // If excerpt is empty, generate from content
    if (!data.excerpt && data.content) {
      const contentText = data.content as string;
      data.excerpt = contentText.substring(0, 150) + (contentText.length > 150 ? '...' : '');
    }

    onSubmit(data);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        <div className="flex space-x-2">
          <Button
            variant={previewMode ? 'outline' : 'primary'}
            size="sm"
            onClick={() => setPreviewMode(false)}
          >
            Edit
          </Button>
          <Button
            variant={previewMode ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode(true)}
          >
            Preview
          </Button>
        </div>
      </div>

      {previewMode ? (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 prose dark:prose-invert max-w-none">
          <h1>{watch('title')}</h1>
          <div className="mb-6">
            {typeof watch('tags') === 'string' ?
              watch('tags').split(',').map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full px-3 py-1 text-xs mr-2"
                >
                  {tag.trim()}
                </span>
              )) :
              watch('tags')?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full px-3 py-1 text-xs mr-2"
                >
                  {tag}
                </span>
              ))
            }
          </div>
          {watch('imageUrl') && (
            <img
              src={watch('imageUrl')}
              alt={watch('title')}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <div className="whitespace-pre-wrap">
            {watchContent}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(processFormData)} className="space-y-4">
          <Input
            label="Title"
            placeholder="Post title"
            fullWidth
            {...register('title', { required: 'Title is required' })}
            error={errors.title?.message}
          />

          <TextArea
            label="Content"
            placeholder="Write your post content here... Markdown is supported"
            rows={15}
            fullWidth
            {...register('content', { required: 'Content is required' })}
            error={errors.content?.message}
          />

          <TextArea
            label="Excerpt (optional, will be generated from content if empty)"
            placeholder="A short description of your post"
            rows={2}
            fullWidth
            {...register('excerpt')}
            error={errors.excerpt?.message}
          />

          <Input
            label="Featured Image URL (optional)"
            placeholder="https://example.com/image.jpg"
            fullWidth
            {...register('imageUrl')}
            error={errors.imageUrl?.message}
          />

          <Input
            label="Tags (comma separated)"
            placeholder="react, typescript, firebase"
            fullWidth
            {...register('tags', { required: 'At least one tag is required' })}
            error={errors.tags?.message}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
              {...register('published')}
            />
            <label
              htmlFor="published"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Publish post
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : isEditing ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogForm;