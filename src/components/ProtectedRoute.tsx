
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Pass through all users - no restrictions needed
  return <>{children}</>;
};

export default ProtectedRoute;
