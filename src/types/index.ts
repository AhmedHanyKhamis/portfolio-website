// Project type definition
export interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  tags: string[];
  featured: boolean;
  createdAt: Date | string;
}

// Blog post type definition
export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  tags: string[];
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// User type definition
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isAdmin?: boolean;
}