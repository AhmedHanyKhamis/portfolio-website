import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';

import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
// import LoginPage from './pages/LoginPage';
import AdminPage from './pages/admin/AdminPage';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import ProjectCreatePage from './pages/admin/ProjectCreatePage';
import ProjectEditPage from './pages/admin/ProjectEditPage';
import BlogAdmin from './pages/admin/BlogAdmin';
import BlogCreatePage from './pages/admin/BlogCreatePage';
import BlogEditPage from './pages/admin/BlogEditPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:postId" element={<BlogDetailPage />} />
            {/* <Route path="/login" element={<LoginPage />} />  */}
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/projects" element={<ProjectsAdmin />} />
            <Route path="/admin/projects/new" element={<ProjectCreatePage />} />
            <Route path="/admin/projects/edit/:projectId" element={<ProjectEditPage />} />
            <Route path="/admin/blog" element={<BlogAdmin />} />
            <Route path="/admin/blog/new" element={<BlogCreatePage />} />
            <Route path="/admin/blog/edit/:postId" element={<BlogEditPage />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
        
        <ToastContainer position="bottom-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;