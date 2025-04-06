
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'pupil' | 'parent';
  sessionId?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'student' | 'pupil' | 'parent') => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (name: string) => void;
  updateUserEmail: (email: string) => void;
  updateUserPassword: (currentPassword: string, newPassword: string) => void;
  testAttemptsRemaining: number;
  decrementTestAttempts: () => void;
  loginAttempts: number;
  resetPassword: (email: string) => Promise<boolean>;
  checkEmailExists: (email: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateUserProfile: () => {},
  updateUserEmail: () => {},
  updateUserPassword: () => {},
  testAttemptsRemaining: 5,
  decrementTestAttempts: () => {},
  loginAttempts: 0,
  resetPassword: async () => false,
  checkEmailExists: async () => false
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { toast } = useToast();
  
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [testAttemptsRemaining, setTestAttemptsRemaining] = useState<number>(() => {
    const attempts = localStorage.getItem('testAttemptsRemaining');
    return attempts ? parseInt(attempts, 10) : 5;
  });
  
  const [loginAttempts, setLoginAttempts] = useState<number>(() => {
    const attempts = localStorage.getItem('loginAttempts');
    return attempts ? parseInt(attempts, 10) : 0;
  });
  
  // Simulate a database of registered emails
  const [registeredEmails, setRegisteredEmails] = useState<Record<string, boolean>>(() => {
    const savedEmails = localStorage.getItem('registeredEmails');
    return savedEmails ? JSON.parse(savedEmails) : {};
  });
  
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    localStorage.setItem('user', user ? JSON.stringify(user) : '');
    localStorage.setItem('testAttemptsRemaining', testAttemptsRemaining.toString());
    localStorage.setItem('loginAttempts', loginAttempts.toString());
    localStorage.setItem('registeredEmails', JSON.stringify(registeredEmails));
  }, [isAuthenticated, user, testAttemptsRemaining, loginAttempts, registeredEmails]);
  
  // Track user sessions
  useEffect(() => {
    const checkSession = () => {
      if (isAuthenticated && user) {
        // Check if another session with the same user is active
        const currentSessionId = user.sessionId;
        const storedSessionId = localStorage.getItem(`session_${user.id}`);
        
        if (storedSessionId && storedSessionId !== currentSessionId) {
          // Another session is active, log out this session
          toast({
            title: "Сессия аяқталды",
            description: "Сіздің аккаунтыңыз басқа құрылғыда кірді",
            variant: "destructive"
          });
          logout();
        }
      }
    };
    
    // Check session on load and periodically
    checkSession();
    const interval = setInterval(checkSession, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [isAuthenticated, user]);
  
  // Check if email exists in our "database"
  const checkEmailExists = async (email: string): Promise<boolean> => {
    // In a real app, this would be an API call to check if the email exists
    return !!registeredEmails[email];
  };
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      // In a real app, this would be an API call to validate credentials
      if (email && password) {
        // Check login attempts for security
        if (loginAttempts >= 5) {
          toast({
            title: "Кіру шектелген",
            description: "Тым көп сәтсіз әрекеттер. Құпия сөзді қалпына келтіріңіз немесе кейінірек қайталап көріңіз.",
            variant: "destructive"
          });
          return false;
        }
        
        // Check if email exists
        if (!registeredEmails[email]) {
          toast({
            title: "Қате",
            description: "Мұндай электрондық пошта тіркелмеген",
            variant: "destructive"
          });
          
          // Increment login attempts
          setLoginAttempts(prev => prev + 1);
          
          return false;
        }
        
        // Generate a unique session ID
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        
        // Retrieve user information (in a real app, this would come from a database)
        const savedUsers = localStorage.getItem('users');
        const users = savedUsers ? JSON.parse(savedUsers) : {};
        const userData = users[email];
        
        if (userData) {
          const mockUser = {
            id: userData.id,
            name: userData.name,
            email,
            role: userData.role,
            sessionId
          };
          
          // Store session ID in localStorage to track active sessions
          localStorage.setItem(`session_${mockUser.id}`, sessionId);
          
          setUser(mockUser);
          setIsAuthenticated(true);
          // Reset login attempts after successful login
          setLoginAttempts(0);
          
          toast({
            title: "Сәтті кіру",
            description: "Сіз жүйеге сәтті кірдіңіз",
          });
          
          return true;
        }
      }
      
      // Increment login attempts
      setLoginAttempts(prev => prev + 1);
      
      toast({
        title: "Қате",
        description: "Электрондық пошта немесе құпия сөз қате",
        variant: "destructive"
      });
      
      return false;
    } catch (error) {
      // Increment login attempts
      setLoginAttempts(prev => prev + 1);
      
      toast({
        title: "Қате",
        description: "Кіру кезінде қате орын алды",
        variant: "destructive"
      });
      
      return false;
    }
  };
  
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // In a real application, you would send password reset email here
      // For now, we'll just simulate success
      if (email) {
        // Check if email exists in our system
        if (!registeredEmails[email]) {
          toast({
            title: "Қате",
            description: "Мұндай электрондық пошта тіркелмеген",
            variant: "destructive"
          });
          return false;
        }
        
        toast({
          title: "Сәтті жіберілді",
          description: "Құпия сөзді қалпына келтіру нұсқаулары электрондық поштаңызға жіберілді",
        });
        
        // Reset login attempts after requesting password reset
        setLoginAttempts(0);
        
        return true;
      }
      
      toast({
        title: "Қате",
        description: "Жарамды электрондық пошта енгізіңіз",
        variant: "destructive"
      });
      
      return false;
    } catch (error) {
      toast({
        title: "Қате",
        description: "Құпия сөзді қалпына келтіру сұрауын өңдеу кезінде қате орын алды",
        variant: "destructive"
      });
      
      return false;
    }
  };
  
  const register = async (name: string, email: string, password: string, role: 'student' | 'pupil' | 'parent'): Promise<boolean> => {
    try {
      // Check if email already exists
      if (registeredEmails[email]) {
        toast({
          title: "Қате",
          description: "Бұл электрондық пошта бұрыннан тіркелген",
          variant: "destructive"
        });
        return false;
      }
      
      // Simulate API call
      // In a real app, this would be an API call to register a new user
      if (name && email && password && role) {
        // Generate a unique session ID
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const userId = 'user-' + Date.now();
        
        // Simulate successful registration
        const newUser = {
          id: userId,
          name,
          email,
          role,
          sessionId
        };
        
        // Store session ID in localStorage to track active sessions
        localStorage.setItem(`session_${newUser.id}`, sessionId);
        
        // Update our "database" of registered emails
        setRegisteredEmails(prev => ({
          ...prev,
          [email]: true
        }));
        
        // Store user information (in a real app, this would be saved to a database)
        const savedUsers = localStorage.getItem('users');
        const users = savedUsers ? JSON.parse(savedUsers) : {};
        users[email] = {
          id: userId,
          name,
          role
        };
        localStorage.setItem('users', JSON.stringify(users));
        
        setUser(newUser);
        setIsAuthenticated(true);
        
        toast({
          title: "Сәтті тіркелу",
          description: "Сіз жүйеге сәтті тіркелдіңіз",
        });
        
        return true;
      }
      
      toast({
        title: "Қате",
        description: "Барлық қажетті өрістерді толтырыңыз",
        variant: "destructive"
      });
      
      return false;
    } catch (error) {
      toast({
        title: "Қате",
        description: "Тіркелу кезінде қате орын алды",
        variant: "destructive"
      });
      
      return false;
    }
  };
  
  const logout = () => {
    if (user) {
      // Clear session
      localStorage.removeItem(`session_${user.id}`);
    }
    
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: "Жүйеден шығу",
      description: "Сіз жүйеден сәтті шықтыңыз",
    });
  };

  const updateUserProfile = (name: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        name
      };
      setUser(updatedUser);
      
      toast({
        title: "Сәтті жаңартылды",
        description: "Профиль ақпараты сәтті жаңартылды",
      });
    }
  };

  const updateUserEmail = (email: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        email
      };
      setUser(updatedUser);
      
      toast({
        title: "Сәтті жаңартылды",
        description: "Электрондық пошта сәтті жаңартылды",
      });
    }
  };

  const updateUserPassword = (currentPassword: string, newPassword: string) => {
    // In a real app, this would validate the current password against the stored password
    // and then update it in the database
    console.log("Password updated from", currentPassword, "to", newPassword);
    
    toast({
      title: "Сәтті жаңартылды",
      description: "Құпия сөз сәтті жаңартылды",
    });
  };
  
  const decrementTestAttempts = () => {
    if (testAttemptsRemaining > 0) {
      setTestAttemptsRemaining(prev => prev - 1);
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      register, 
      logout,
      updateUserProfile,
      updateUserEmail,
      updateUserPassword,
      testAttemptsRemaining,
      decrementTestAttempts,
      loginAttempts,
      resetPassword,
      checkEmailExists
    }}>
      {children}
    </AuthContext.Provider>
  );
};
