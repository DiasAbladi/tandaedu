
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, ThumbsUp, MessageSquare, Share2, Eye, Search, TrendingUp, Calendar, User, Tag } from "lucide-react";
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
  author?: string;
  tags?: string[];
  isBreaking?: boolean;
}

const NewsPage: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { currentLanguage } = useContext(LanguageContext);
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("Барлығы");
  const [searchTerm, setSearchTerm] = useState("");

  // Ерекше жаңалық
  const [featuredNews, setFeaturedNews] = useState<NewsArticle>({
    id: "university-rating-2025",
    title: "Қазақстандағы жоғары білім жүйесінде революциялық өзгерістер - 2025",
    category: "Университеттер",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Білім министрлігі жоғары оқу орындарының жаңа аккредиттеу жүйесін енгізуде. Бұл өзгерістер студенттердің болашағына қалай әсер етеді?",
    views: 0,
    timestamp: "1 сағат бұрын",
    likes: 0,
    comments: 0,
    author: "Айгерім Қасымова",
    tags: ["жоғары білім", "аккредиттеу", "реформа"],
    isBreaking: true
  });
  
  // Жаңалықтар тізімі
  const [allNews, setAllNews] = useState<NewsArticle[]>([
    {
      id: "ubt-2025-changes",
      title: "ҰБТ-2025: Жаңа пәндер мен өзгерістер туралы толық ақпарат",
      category: "ҰБТ",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "2025 жылғы ҰБТ-да енгізілетін жаңа пәндер мен өзгерістер. Абитуриенттер не күтуі керек?",
      views: 0,
      timestamp: "3 сағат бұрын",
      likes: 0,
      comments: 0,
      author: "Нұрлан Әбдіқалықов",
      tags: ["ҰБТ", "өзгерістер", "2025"]
    },
    {
      id: "grants-distribution-2025",
      title: "2025 жылғы мемлекеттік гранттардың бөлінуі: Қандай мамандықтар басымдықта?",
      category: "Гранттар",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Жаңа оқу жылына арналған мемлекеттік гранттардың бөлінуі туралы ресми мәліметтер жарияланды.",
      views: 0,
      timestamp: "5 сағат бұрын",
      likes: 0,
      comments: 0,
      author: "Сәуле Нұрғалиева",
      tags: ["гранттар", "мамандықтар", "бөліну"]
    },
    {
      id: "digital-education-initiative",
      title: "Қазақстанда цифрлық білім беру жобасы басталды",
      category: "Білім",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Барлық жоғары оқу орындарында цифрлық технологиялар енгізілуде. Бұл студенттерге қандай мүмкіндіктер ашады?",
      views: 0,
      timestamp: "8 сағат бұрын",
      likes: 0,
      comments: 0,
      author: "Ерлан Қайыржанов",
      tags: ["цифрландыру", "технологии", "инновация"]
    },
    {
      id: "nazarbayev-university-expansion",
      title: "Нұрсұлтан Назарбаев Университеті жаңа факультет ашады",
      category: "Университеттер",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Жасанды интеллект пен робототехника факультеті 2025 жылдан бастап студенттерді қабылдайды.",
      views: 0,
      timestamp: "12 сағат бұрын",
      likes: 0,
      comments: 0,
      author: "Динара Омарова",
      tags: ["Назарбаев университеті", "ЖИ", "робототехника"]
    },
    {
      id: "scholarship-programs-2025",
      title: "Халықаралық стипендия бағдарламалары: Қазақстандық студенттерге мүмкіндіктер",
      category: "Стипендиялар",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Болашақ, Erasmus+ және басқа халықаралық бағдарламалар бойынша өтініш беру мерзімдері ашылды.",
      views: 0,
      timestamp: "1 күн бұрын",
      likes: 0,
      comments: 0,
      author: "Асем Төлеубаева",
      tags: ["стипендия", "халықаралық", "Болашақ"]
    },
    {
      id: "career-guidance-program",
      title: "Жаңа мамандық бағдар беру бағдарламасы іске қосылды",
      category: "Мамандықтар",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Мектеп түлектеріне арналған кешенді мамандық бағдар беру жүйесі енгізіледі.",
      views: 0,
      timestamp: "1 күн бұрын",
      likes: 0,
      comments: 0,
      author: "Жанар Сейдахметова",
      tags: ["мамандық", "бағдар", "мектеп түлектері"]
    },
    {
      id: "remote-learning-statistics",
      title: "Қашықтықтан оқыту: Қазақстандағы статистика мен болашақ",
      category: "Білім",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Пандемиядан кейінгі қашықтықтан оқыту жүйесінің дамуы және оның тиімділігі туралы зерттеу.",
      views: 0,
      timestamp: "2 күн бұрын",
      likes: 0,
      comments: 0,
      author: "Мұрат Жұмабаев",
      tags: ["қашықтықтан оқыту", "статистика", "зерттеу"]
    },
    {
      id: "technical-universities-ranking",
      title: "Техникалық университеттердің жаңа рейтингі жарияланды",
      category: "Университеттер",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Инженерлік және техникалық бағыттар бойынша үздік университеттердің тізімі.",
      views: 0,
      timestamp: "2 күн бұрын",
      likes: 0,
      comments: 0,
      author: "Әлия Бейсенова",
      tags: ["техникалық университеттер", "рейтинг", "инженерия"]
    },
    {
      id: "student-startup-support",
      title: "Студенттік стартаптарға мемлекеттік қолдау күшейтіледі",
      category: "Стартаптар",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Жас кәсіпкерлерге арналған жаңа қолдау бағдарламалары мен гранттық жобалар туралы.",
      views: 0,
      timestamp: "3 күн бұрын",
      likes: 0,
      comments: 0,
      author: "Қанат Сәрсенов",
      tags: ["стартап", "кәсіпкерлік", "жастар"]
    },
    {
      id: "medical-education-reform",
      title: "Медициналық білім беру жүйесінде жаңа стандарттар",
      category: "Медицина",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Медициналық университеттерде практикалық дайындықты күшейту шаралары қабылданды.",
      views: 0,
      timestamp: "3 күн бұрын",
      likes: 0,
      comments: 0,
      author: "Гүлнәр Есенгелдиева",
      tags: ["медицина", "стандарттар", "практика"]
    },
    {
      id: "language-learning-initiative",
      title: "Үштілділік жобасы: Қазақстандық студенттердің тілдік дайындығы",
      category: "Тілдер",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Қазақ, орыс және ағылшын тілдерін меңгеру деңгейін арттыру бойынша жаңа бастамалар.",
      views: 0,
      timestamp: "4 күн бұрын",
      likes: 0,
      comments: 0,
      author: "Салтанат Әбенова",
      tags: ["үштілділік", "тілдік дайындық", "бастама"]
    },
    {
      id: "sports-education-development",
      title: "Спорт және дене шынықтыру мамандықтарының дамуы",
      category: "Спорт",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Спорт саласындағы маманды дайындау жүйесінің жаңартылуы және олимпиадалық резерв.",
      views: 0,
      timestamp: "4 күн бұрын",
      likes: 0,
      comments: 0,
      author: "Бауыржан Құттыбаев",
      tags: ["спорт", "дене шынықтыру", "олимпиада"]
    }
  ]);

  // Танымал жаңалықтар
  const [trendingNews, setTrendingNews] = useState<NewsArticle[]>([
    {
      id: "trending-1",
      title: "Қазақстандық студент халықаралық олимпиадада алтын медаль алды",
      category: "Жетістіктер",
      image: "https://images.unsplash.com/photo-1489710020360-66542e8d1d67?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Математика бойынша халықаралық олимпиадада біздің елімізді абыройлы түрде білдірді.",
      views: 0,
      timestamp: "6 сағат бұрын",
      likes: 0,
      comments: 0,
      author: "Мадина Қасымова"
    },
    {
      id: "trending-2",
      title: "IT мамандықтарына деген сұраныс 40%-ға өсті",
      category: "IT",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Цифрландыру процесі IT саласындағы мамандарға деген сұранысты күрт арттырды.",
      views: 0,
      timestamp: "10 сағат бұрын",
      likes: 0,
      comments: 0,
      author: "Даурен Әбдіжапаров"
    },
    {
      id: "trending-3",
      title: "Жасыл энергетика мамандықтары: Болашақтың кәсібі",
      category: "Энергетика",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Жаңартылатын энергия көздері саласындағы маманды дайындау бағдарламалары кеңейтіледі.",
      views: 0,
      timestamp: "14 сағат бұрын",
      likes: 0,
      comments: 0,
      author: "Айдос Құрманғалиев"
    }
  ]);

  // Санаттар тізімі
  const categories = [
    "Барлығы", "ҰБТ", "Гранттар", "Университеттер", "Мамандықтар", 
    "Білім", "Стипендиялар", "Стартаптар", "Медицина", "Тілдер", 
    "Спорт", "IT", "Энергетика", "Жетістіктер"
  ];

  // Load data from localStorage when component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = user.id;
      if (userId) {
        if (!localStorage.getItem(`user_viewed_articles_${userId}`)) {
          localStorage.setItem(`user_viewed_articles_${userId}`, JSON.stringify([]));
        }
        if (!localStorage.getItem(`user_liked_articles_${userId}`)) {
          localStorage.setItem(`user_liked_articles_${userId}`, JSON.stringify([]));
        }
      }
    }
    
    // Load view counts, like counts, and comment counts
    const loadCounts = () => {
      // For featured news
      const featuredViews = localStorage.getItem(`news_views_${featuredNews.id}`);
      const featuredLikes = localStorage.getItem(`news_likes_${featuredNews.id}`);
      const featuredComments = localStorage.getItem(`news_comments_${featuredNews.id}`);
      
      if (featuredViews || featuredLikes || featuredComments) {
        setFeaturedNews(prev => ({
          ...prev,
          views: featuredViews ? parseInt(featuredViews, 10) : prev.views,
          likes: featuredLikes ? parseInt(featuredLikes, 10) : prev.likes,
          comments: featuredComments ? JSON.parse(featuredComments).length : prev.comments
        }));
      }
      
      // For all news
      const updatedNews = allNews.map(news => {
        const storedViews = localStorage.getItem(`news_views_${news.id}`);
        const storedLikes = localStorage.getItem(`news_likes_${news.id}`);
        const storedComments = localStorage.getItem(`news_comments_${news.id}`);
        
        return {
          ...news,
          views: storedViews ? parseInt(storedViews, 10) : news.views,
          likes: storedLikes ? parseInt(storedLikes, 10) : news.likes,
          comments: storedComments ? JSON.parse(storedComments).length : news.comments
        };
      });
      setAllNews(updatedNews);

      // For trending news
      const updatedTrending = trendingNews.map(news => {
        const storedViews = localStorage.getItem(`news_views_${news.id}`);
        const storedLikes = localStorage.getItem(`news_likes_${news.id}`);
        const storedComments = localStorage.getItem(`news_comments_${news.id}`);
        
        return {
          ...news,
          views: storedViews ? parseInt(storedViews, 10) : news.views,
          likes: storedLikes ? parseInt(storedLikes, 10) : news.likes,
          comments: storedComments ? JSON.parse(storedComments).length : news.comments
        };
      });
      setTrendingNews(updatedTrending);
    };
    
    loadCounts();
  }, [isAuthenticated, user]);
  
  // Function to update view counts when clicking on news
  const incrementViewCount = (type: 'featured' | 'regular' | 'trending', id: string) => {
    if (!isAuthenticated || !user) return;
    
    const userId = user.id;
    const viewedArticles = JSON.parse(localStorage.getItem(`user_viewed_articles_${userId}`) || '[]');
    const hasViewed = viewedArticles.includes(id);
    
    if (!hasViewed) {
      viewedArticles.push(id);
      localStorage.setItem(`user_viewed_articles_${userId}`, JSON.stringify(viewedArticles));
      
      const storedViews = localStorage.getItem(`news_views_${id}`);
      const currentViews = storedViews ? parseInt(storedViews, 10) : 0;
      const newViewCount = currentViews + 1;
      
      localStorage.setItem(`news_views_${id}`, newViewCount.toString());
      
      // Update state
      if (type === 'featured') {
        setFeaturedNews(prev => ({ ...prev, views: newViewCount }));
      } else if (type === 'regular') {
        setAllNews(prev => 
          prev.map(news => 
            news.id === id ? { ...news, views: newViewCount } : news
          )
        );
      } else if (type === 'trending') {
        setTrendingNews(prev => 
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
    
    likedArticles.push(articleId);
    localStorage.setItem(`user_liked_articles_${userId}`, JSON.stringify(likedArticles));
    
    const storedLikes = localStorage.getItem(`news_likes_${articleId}`);
    const currentLikes = storedLikes ? parseInt(storedLikes, 10) : 0;
    const newLikeCount = currentLikes + 1;
    
    localStorage.setItem(`news_likes_${articleId}`, newLikeCount.toString());
    
    // Update state
    if (featuredNews.id === articleId) {
      setFeaturedNews(prev => ({ ...prev, likes: newLikeCount }));
    } else {
      setAllNews(prev =>
        prev.map(article =>
          article.id === articleId ? { ...article, likes: newLikeCount } : article
        )
      );
      setTrendingNews(prev =>
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

  // Filter news based on category and search term
  const filteredNews = allNews.filter(news => {
    const matchesCategory = activeCategory === "Барлығы" || news.category === activeCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with Search */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Білім беру жаңалықтары
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Қазақстандағы білім беру саласындағы соңғы жаңалықтар мен жаңартулар
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Жаңалықтарды іздеу..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-black"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 md:px-6 py-8">
          {/* Breaking News Badge */}
          {featuredNews.isBreaking && (
            <div className="mb-6">
              <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                АРНАЙЫ ЖАҢАЛЫҚ
              </div>
            </div>
          )}

          {/* Featured News Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Featured Article */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
                <Link 
                  to={`/news/${featuredNews.id}`} 
                  className="block"
                  onClick={() => incrementViewCount('featured', featuredNews.id)}
                >
                  <div className="relative h-96">
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                          {featuredNews.category}
                        </span>
                        {featuredNews.isBreaking && (
                          <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-medium">
                            ЖАҢА
                          </span>
                        )}
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                        {featuredNews.title}
                      </h2>
                      
                      <p className="text-gray-200 mb-4 line-clamp-2">
                        {featuredNews.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm space-x-4">
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {featuredNews.author}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {featuredNews.timestamp}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {featuredNews.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button 
                    className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-sm shadow-sm transition-colors hover:bg-white"
                    onClick={() => handleLike(featuredNews.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{featuredNews.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-sm shadow-sm transition-colors hover:bg-white">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Trending News Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-5 w-5 text-red-500 mr-2" />
                  <h3 className="text-lg font-bold">Танымал жаңалықтар</h3>
                </div>
                
                <div className="space-y-4">
                  {trendingNews.map((news, index) => (
                    <Link 
                      key={news.id}
                      to={`/news/${news.id}`}
                      className="flex gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                      onClick={() => incrementViewCount('trending', news.id)}
                    >
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold line-clamp-2 mb-1">
                          {news.title}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 space-x-2">
                          <span>{news.timestamp}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {news.views}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Categories Filter */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Соңғы жаңалықтар</h2>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-500">Жаңартылған: {new Date().toLocaleDateString('kk-KZ')}</span>
              </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className="rounded-full flex-shrink-0"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredNews.map(news => (
              <article key={news.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <Link 
                  to={`/news/${news.id}`}
                  onClick={() => incrementViewCount('regular', news.id)}
                  className="block"
                >
                  <div className="relative h-48">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {news.category}
                      </span>
                    </div>
                  </div>
                </Link>
                
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {news.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {news.timestamp}
                      </span>
                    </div>
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {news.views}
                    </span>
                  </div>
                  
                  <Link 
                    to={`/news/${news.id}`} 
                    className="block group"
                    onClick={() => incrementViewCount('regular', news.id)}
                  >
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {news.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {news.description}
                  </p>
                  
                  {/* Tags */}
                  {news.tags && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {news.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button 
                        className="flex items-center hover:text-red-500 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLike(news.id);
                        }}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{news.likes}</span>
                      </button>
                      
                      <Link 
                        to={`/news/${news.id}#comments`} 
                        className="flex items-center hover:text-blue-500 transition-colors"
                        onClick={() => incrementViewCount('regular', news.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{news.comments}</span>
                      </Link>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Load More Button */}
          {filteredNews.length > 0 && (
            <div className="text-center">
              <Button size="lg" className="px-8">
                Тағы көру
              </Button>
            </div>
          )}
          
          {/* No Results */}
          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Жаңалықтар табылмады
              </h3>
              <p className="text-gray-500">
                Іздеу сөзін өзгертіп көріңіз немесе басқа санатты таңдаңыз
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsPage;
