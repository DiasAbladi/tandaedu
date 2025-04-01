
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UniversitiesPage from "./pages/UniversitiesPage";
import MajorsPage from "./pages/MajorsPage";
import NewsPage from "./pages/NewsPage";
import CareerTestPage from "./pages/CareerTestPage";
import TestQuestionPage from "./pages/TestQuestionPage";
import ConsultingPage from "./pages/ConsultingPage";
import BlogPage from "./pages/BlogPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/universities" element={<UniversitiesPage />} />
          <Route path="/majors" element={<MajorsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/test" element={<CareerTestPage />} />
          <Route path="/test/question" element={<TestQuestionPage />} />
          <Route path="/counseling" element={<ConsultingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
