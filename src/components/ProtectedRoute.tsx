
import { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { toast } = useToast();
  
  if (!isAuthenticated) {
    toast({
      title: "Кіру қажет",
      description: "Бұл бетке кіру үшін жүйеге кіру қажет",
      variant: "destructive"
    });
    
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
