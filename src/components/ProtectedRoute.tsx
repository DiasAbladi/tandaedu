import { useContext, ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // We'll keep this component but make it pass through all users
  // This allows us to gradually transition if we want to add restrictions again later
  return <>{children}</>;
};

export default ProtectedRoute;
