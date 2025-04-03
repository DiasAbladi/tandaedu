
import { useContext, ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { toast } = useToast();
  const location = useLocation();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Кіру қажет",
        description: "Бұл бетке кіру үшін жүйеге кіру қажет",
        variant: "destructive"
      });
    }
  }, [isAuthenticated, toast]);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
