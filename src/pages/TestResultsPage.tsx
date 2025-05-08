
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TestResultsPage: React.FC = () => {
  // This page is not used directly anymore as results are shown in the same page
  // Redirect to the main test page
  return <Navigate to="/test" replace />;
};

export default TestResultsPage;
