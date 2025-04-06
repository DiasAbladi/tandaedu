
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Clock, ThumbsUp, MessageSquare, Share2, Eye } from "lucide-react";
import { AuthContext } from '@/contexts/AuthContext';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  views: number;
  timestamp: string;
  likes: number;
  comments: number;
}

const NewsPage: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { currentLanguage } = useContext(LanguageContext);
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("Барлығы");

  // Initialize with 0 counts
  const [featuredNews, setFeaturedNews] = useState<NewsArticle>({
    id: "university-rating-2025",
    title: "2025 жылғы үздік университеттер рейтингі жарияланды",
    category: "Университеттер",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Қазақстандағы жоғары оқу орындарының жаңа рейтингі жарияланды. Топ үштікте қандай университеттер орын алды?",
    views: 0,
    timestamp: "2 сағат бұрын",
    likes: 0,
    comments: 0
  });
  
  const [sideNews, setSideNews] = useState<NewsArticle[]>([
    {
      id: "ubt-preparation",
      title: "ҰБТға дайындық: маңызды кеңестер",
      category: "ҰБТ",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      description: "Сарапшылардың ҰБТ-ға дайындық бойынша ұсыныстары",
      views: 0,
      timestamp: "5 сағат бұрын",
      likes: 0,
      comments: 0
    },
    {
      id: "grants-2025",
      title: "2025 жылғы мемлекеттік грант иегерлері анықталды",
      category: "Гранттар",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80", 
      description: "Биылғы грант иегерлерінің толық тізімі",
      views: 0,
      timestamp: "1 күн бұрын",
      likes: 0,
      comments: 0
    }
  ]);
  
  const [recentNews, setRecentNews] = useState<NewsArticle[]>([
    {
      id: "student-conferences",
      title: "Жаңа оқу жылында өткізілетін әлеуметтер",
      category: "Білім",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      description: "2025 жылғы оқу жылында күтілетін жиналыстар мен әлеуметтер",
      views: 0,
      timestamp: "3 күн бұрын",
      likes: 0,
      comments: 0
    },
    {
      id: "new-university",
      title: "Жаңа университет ашылады",
      category: "Университеттер",
      image: "https://images.unsplash.com/photo-1498322590555-139c697a8abe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
      description: "Алматыда жаңартылған дизайнмен жергілікті жаңа университет ашылады",
      views: 0,
      timestamp: "4 күн бұрын",
      likes: 0,
      comments: 0
    },
    {
      id: "top-majors",
      title: "Ең сұранысқа ие мамандықтар - 2025",
      category: "Мамандықтар",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Болашақта сұранысқа ие болатын мамандықтар тізімі",
      views: 0,
      timestamp: "5 күн бұрын",
      likes: 0,
      comments: 0
    }
  ]);
  
  // Load data from localStorage when component mounts
  useEffect(() => {
    // Check if user has viewed articles before
    if (isAuthenticated && user) {
      const userId = user.id;
      if (userId) {
        // Initialize viewed articles for this user if not already set
        if (!localStorage.getItem(`user_viewed_articles_${userId}`)) {
          localStorage.setItem(`user_viewed_articles_${userId}`, JSON.stringify([]));
        }
        
        // Initialize liked articles for this user if not already set
        if (!localStorage.getItem(`user_liked_articles_${userId}`)) {
          localStorage.setItem(`user_liked_articles_${userId}`, JSON.stringify([]));
        }
      }
    }
    
    // Load view counts
    const loadViewCounts = () => {
      // For featured news
      const featuredViews = localStorage.getItem(`news_views_${featuredNews.id}`);
      if (featuredViews) {
        setFeaturedNews(prev => ({
          ...prev,
          views: parseInt(featuredViews, 10)
        }));
      }
      
      // For side news
      const updatedSideNews = sideNews.map(news => {
        const storedViews = localStorage.getItem(`news_views_${news.id}`);
        if (storedViews) {
          return {
            ...news,
            views: parseInt(storedViews, 10)
          };
        }
        return news;
      });
      setSideNews(updatedSideNews);
      
      // For recent news
      const updatedRecentNews = recentNews.map(news => {
        const storedViews = localStorage.getItem(`news_views_${news.id}`);
        if (storedViews) {
          return {
            ...news,
            views: parseInt(storedViews, 10)
          };
        }
        return news;
      });
      setRecentNews(updatedRecentNews);
    };
    
    // Load like counts
    const loadLikeCounts = () => {
      // For featured news
      const featuredLikes = localStorage.getItem(`news_likes_${featuredNews.id}`);
      if (featuredLikes) {
        setFeaturedNews(prev => ({
          ...prev,
          likes: parseInt(featuredLikes, 10)
        }));
      }
      
      // For side news
      const updatedSideNews = sideNews.map(news => {
        const storedLikes = localStorage.getItem(`news_likes_${news.id}`);
        if (storedLikes) {
          return {
            ...news,
            likes: parseInt(storedLikes, 10)
          };
        }
        return news;
      });
      setSideNews(updatedSideNews);
      
      // For recent news
      const updatedRecentNews = recentNews.map(news => {
        const storedLikes = localStorage.getItem(`news_likes_${news.id}`);
        if (storedLikes) {
          return {
            ...news,
            likes: parseInt(storedLikes, 10)
          };
        }
        return news;
      });
      setRecentNews(updatedRecentNews);
    };
    
    // Load comment counts
    const loadCommentCounts = () => {
      // For featured news
      const featuredComments = localStorage.getItem(`news_comments_${featuredNews.id}`);
      if (featuredComments) {
        const commentsArray = JSON.parse(featuredComments);
        setFeaturedNews(prev => ({
          ...prev,
          comments: commentsArray.length
        }));
      }
      
      // For side news
      const updatedSideNews = sideNews.map(news => {
        const storedComments = localStorage.getItem(`news_comments_${news.id}`);
        if (storedComments) {
          const commentsArray = JSON.parse(storedComments);
          return {
            ...news,
            comments: commentsArray.length
          };
        }
        return news;
      });
      setSideNews(updatedSideNews);
      
      // For recent news
      const updatedRecentNews = recentNews.map(news => {
        const storedComments = localStorage.getItem(`news_comments_${news.id}`);
        if (storedComments) {
          const commentsArray = JSON.parse(storedComments);
          return {
            ...news,
            comments: commentsArray.length
          };
        }
        return news;
      });
      setRecentNews(updatedRecentNews);
    };
    
    loadViewCounts();
    loadLikeCounts();
    loadCommentCounts();
  }, [isAuthenticated, user]);
  
  // Function to update view counts when clicking on news
  const incrementViewCount = (type: 'featured' | 'side' | 'recent', id: string) => {
    if (!isAuthenticated || !user) return; // Only count views for authenticated users
    
    const userId = user.id;
    const viewedArticles = JSON.parse(localStorage.getItem(`user_viewed_articles_${userId}`) || '[]');
    const hasViewed = viewedArticles.includes(id);
    
    if (!hasViewed) {
      // Add article to user's viewed list
      viewedArticles.push(id);
      localStorage.setItem(`user_viewed_articles_${userId}`, JSON.stringify(viewedArticles));
      
      // Get current view count
      const storedViews = localStorage.getItem(`news_views_${id}`);
      const currentViews = storedViews ? parseInt(storedViews, 10) : 0;
      const newViewCount = currentViews + 1;
      
      // Save to localStorage
      localStorage.setItem(`news_views_${id}`, newViewCount.toString());
      
      // Update state
      if (type === 'featured') {
        setFeaturedNews(prev => ({
          ...prev,
          views: newViewCount
        }));
      } else if (type === 'side') {
        setSideNews(prev => 
          prev.map(news => 
            news.id === id ? { ...news, views: newViewCount } : news
          )
        );
      } else if (type === 'recent') {
        setRecentNews(prev => 
          prev.map(news => 
            news.id === id ? { ...news, views: newViewCount } : news
          )
        );
      }
    }
  };
  
  const handleLike = (articleId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Кіру қажет",
        description: "Лайк басу үшін жүйеге кіріңіз",
        variant: "default"
      });
      return;
    }
    
    if (!user) return;
    
    const userId = user.id;
    const likedArticles = JSON.parse(localStorage.getItem(`user_liked_articles_${userId}`) || '[]');
    const hasLiked = likedArticles.includes(articleId);
    
    if (hasLiked) {
      toast({
        title: "Лайк қойылған",
        description: "Сіз бұл жаңалыққа лайк бастыңыз",
        variant: "default"
      });
      return;
    }
    
    // Add article to user's liked list
    likedArticles.push(articleId);
    localStorage.setItem(`user_liked_articles_${userId}`, JSON.stringify(likedArticles));
    
    // Get current like count
    const storedLikes = localStorage.getItem(`news_likes_${articleId}`);
    const currentLikes = storedLikes ? parseInt(storedLikes, 10) : 0;
    const newLikeCount = currentLikes + 1;
    
    // Save to localStorage
    localStorage.setItem(`news_likes_${articleId}`, newLikeCount.toString());
    
    // Update state
    if (featuredNews.id === articleId) {
      setFeaturedNews(prev => ({
        ...prev,
        likes: newLikeCount
      }));
    } else {
      setSideNews(prev =>
        prev.map(article =>
          article.id === articleId ? { ...article, likes: newLikeCount } : article
        )
      );
      setRecentNews(prev =>
        prev.map(article =>
          article.id === articleId ? { ...article, likes: newLikeCount } : article
        )
      );
    }
    
    toast({
      title: "Лайк қойылды",
      description: "Рахмет, сіздің дауысыңыз қабылданды",
      variant: "default"
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-12">
          {/* Featured News Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="md:col-span-2 relative overflow-hidden rounded-lg">
              <Link 
                to={`/news/${featuredNews.id}`} 
                className="block"
                onClick={() => incrementViewCount('featured', featuredNews.id)}
              >
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-sm bg-blue-600 px-2 py-1 rounded-full inline-block mb-3">{featuredNews.category}</span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">{featuredNews.title}</h2>
                  <div className="flex items-center text-sm">
                    <span className="flex items-center mr-4">
                      <Clock className="h-4 w-4 mr-1" /> {featuredNews.timestamp}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" /> {featuredNews.views}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button 
                  className={`flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-sm shadow-sm transition-colors hover:bg-white ${isAuthenticated ? '' : 'cursor-not-allowed'}`}
                  onClick={() => handleLike(featuredNews.id)}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{featuredNews.likes}</span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              {sideNews.map(news => (
                <Link 
                  to={`/news/${news.id}`} 
                  key={news.id} 
                  className="flex gap-4 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                  onClick={() => incrementViewCount('side', news.id)}
                >
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="text-xs text-blue-600 font-medium">{news.category}</span>
                    <h3 className="font-semibold line-clamp-2 mb-2">{news.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-auto">
                      <Clock className="h-3 w-3 mr-1" /> 
                      <span>{news.timestamp}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" /> {news.views}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Recent News */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Соңғы жаңалықтар</h2>
            
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {["Барлығы", "ҰБТ", "Гранттар", "Университеттер", "Мамандықтар"].map(category => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentNews.map(news => (
                <div key={news.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
                  <Link 
                    to={`/news/${news.id}`}
                    onClick={() => incrementViewCount('recent', news.id)}
                  >
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <div className="text-xs text-blue-600 font-medium mb-2">{news.category}</div>
                    <Link 
                      to={`/news/${news.id}`} 
                      className="block"
                      onClick={() => incrementViewCount('recent', news.id)}
                    >
                      <h3 className="font-bold text-lg mb-2 hover:text-blue-600 transition-colors">{news.title}</h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{news.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> 
                        <span>{news.timestamp}</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" /> {news.views}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button 
                          className={`flex items-center ${isAuthenticated ? 'hover:text-red-500' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLike(news.id);
                          }}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{news.likes}</span>
                        </button>
                        <Link to={`/news/${news.id}`} className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{news.comments}</span>
                        </Link>
                        <button className="flex items-center">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button>Тағы көру</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsPage;
