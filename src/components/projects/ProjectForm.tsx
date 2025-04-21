import React from 'react';
import { useForm } from 'react-hook-form';
import { Project } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: Partial<Project>) => void;
  isLoading: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  isLoading
}) => {
  const isEditing = !!project;
  
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Project>>({
    defaultValues: project || {
      title: '',
      description: '',
      imageUrl: '',
      githubUrl: '',
      demoUrl: '',
      tags: [],
      featured: false
    }
  });

  const processFormData = (data: Partial<Project>) => {
    // Convert comma-separated tags string to array
    if (typeof data.tags === 'string') {
      data.tags = (data.tags as string).split(',').map(tag => tag.trim());
    }
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(processFormData)} className="space-y-4">
      <Input
        label="Title"
        placeholder="Project title"
        fullWidth
        {...register('title', { required: 'Title is required' })}
        error={errors.title?.message}
      />
      
      <TextArea
        label="Description"
        placeholder="Project description"
        rows={4}
        fullWidth
        {...register('description', { required: 'Description is required' })}
        error={errors.description?.message}
      />
      
      <Input
        label="Image URL"
        placeholder="https://example.com/image.jpg"
        fullWidth
        {...register('imageUrl', { required: 'Image URL is required' })}
        error={errors.imageUrl?.message}
      />
      
      <Input
        label="GitHub URL (optional)"
        placeholder="https://github.com/username/repo"
        fullWidth
        {...register('githubUrl')}
        error={errors.githubUrl?.message}
      />
      
      <Input
        label="Demo URL (optional)"
        placeholder="https://demo-site.com"
        fullWidth
        {...register('demoUrl')}
        error={errors.demoUrl?.message}
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
          id="featured"
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          {...register('featured')}
        />
        <label
          htmlFor="featured"
          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
        >
          Featured project
        </label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : isEditing ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;