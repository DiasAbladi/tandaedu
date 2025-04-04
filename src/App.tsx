
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import UniversitiesPage from "./pages/UniversitiesPage";
import UniversityDetailPage from "./pages/UniversityDetailPage";
import MajorsPage from "./pages/MajorsPage";
import MajorDetailPage from "./pages/MajorDetailPage";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import CareerTestPage from "./pages/CareerTestPage";
import TestQuestionPage from "./pages/TestQuestionPage";
import ConsultingPage from "./pages/ConsultingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/universities" element={<UniversitiesPage />} />
              <Route path="/universities/:id" element={<UniversityDetailPage />} />
              <Route path="/majors" element={<MajorsPage />} />
              <Route path="/majors/:id" element={<MajorDetailPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsDetailPage />} />
              <Route path="/test" element={<CareerTestPage />} />
              <Route path="/test/question" element={<ProtectedRoute><TestQuestionPage /></ProtectedRoute>} />
              <Route path="/counseling" element={<ProtectedRoute><ConsultingPage /></ProtectedRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
