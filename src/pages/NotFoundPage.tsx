import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          <Home size={18} className="mr-2" /> Go to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;