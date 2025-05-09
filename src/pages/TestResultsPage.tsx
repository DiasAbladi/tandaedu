
import React from 'react';
import { Navigate } from 'react-router-dom';

const TestResultsPage: React.FC = () => {
  // This page is not used directly anymore as results are shown in the same page
  // Redirect to the main test page with the results tab active
  return <Navigate to="/test" replace />;
};

export default TestResultsPage;
