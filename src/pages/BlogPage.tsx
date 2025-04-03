
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2, 
  Search, 
  Filter, 
  CalendarDays 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { LanguageContext } from '@/contexts/LanguageContext';
import { AuthContext } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
}

const BlogPage: React.FC = () => {
  const { currentLanguage } = useContext(LanguageContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [featuredPost, setFeaturedPost] = useState<BlogPost>({
    id: "university-rankings",
    title: currentLanguage === 'kk' 
      ? "2025 жылғы үздік университеттер рейтингі жарияланды"
      : "Опубликован рейтинг лучших университетов 2025 года",
    excerpt: currentLanguage === 'kk'
      ? "Қазақстандағы жоғары оқу орындарының жаңа рейтингі жарияланды. Топ үштікте қандай университеттер орын алды?"
      : "Опубликован новый рейтинг высших учебных заведений Казахстана. Какие университеты вошли в топ-3?",
    category: currentLanguage === 'kk' ? "Университеттер" : "Университеты",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    author: currentLanguage === 'kk' ? "Админ" : "Админ",
    date: currentLanguage === 'kk' ? "2 сағат бұрын" : "2 часа назад",
    views: 1700,
    likes: 24,
    comments: 8
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "ubt-prep",
      title: currentLanguage === 'kk' ? "ҰБТға дайындық: маңызды кеңестер" : "Подготовка к ЕНТ: важные советы",
      excerpt: currentLanguage === 'kk' ? "Сарапшылардың ҰБТ-ға дайындық бойынша ұсыныстары" : "Рекомендации экспертов по подготовке к ЕНТ",
      category: currentLanguage === 'kk' ? "ҰБТ" : "ЕНТ",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      author: currentLanguage === 'kk' ? "Админ" : "Админ",
      date: currentLanguage === 'kk' ? "5 сағат бұрын" : "5 часов назад",
      views: 856,
      likes: 15,
      comments: 3
    },
    {
      id: "grants-2025",
      title: currentLanguage === 'kk' ? "2025 жылғы мемлекеттік грант иегерлері анықталды" : "Определены обладатели государственных грантов 2025 года",
      excerpt: currentLanguage === 'kk' ? "Биылғы грант иегерлерінің толық тізімі. Қандай мамандықтарға көп грант бөлінді?" : "Полный список обладателей грантов этого года. На какие специальности выделено больше грантов?",
      category: currentLanguage === 'kk' ? "Гранттар" : "Гранты",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
      author: currentLanguage === 'kk' ? "Админ" : "Админ",
      date: currentLanguage === 'kk' ? "1 күн бұрын" : "1 день назад",
      views: 1500,
      likes: 32,
      comments: 12
    },
    {
      id: "student-conferences",
      title: currentLanguage === 'kk' ? "Жаңа оқу жылында енгізілетін өзгерістер" : "Изменения, вводимые в новом учебном году",
      excerpt: currentLanguage === 'kk' ? "2025 жылғы оқу жылында күтілетін маңызды өзгерістер мен жаңартулар." : "Важные изменения и обновления, ожидаемые в 2025 учебном году.",
      category: currentLanguage === 'kk' ? "Білім" : "Образование",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      author: currentLanguage === 'kk' ? "Админ" : "Админ",
      date: currentLanguage === 'kk' ? "3 күн бұрын" : "3 дня назад",
      views: 423,
      likes: 9,
      comments: 2
    },
    {
      id: "new-university",
      title: currentLanguage === 'kk' ? "Жаңа университет ашылады" : "Открывается новый университет",
      excerpt: currentLanguage === 'kk' ? "Алматыда жаңартылған дизайнмен жергілікті жаңа университет ашылады" : "В Алматы открывается новый местный университет с обновленным дизайном",
      category: currentLanguage === 'kk' ? "Университеттер" : "Университеты",
      image: "https://images.unsplash.com/photo-1498322590555-139c697a8abe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      author: currentLanguage === 'kk' ? "Админ" : "Админ",
      date: currentLanguage === 'kk' ? "4 күн бұрын" : "4 дня назад",
      views: 755,
      likes: 18,
      comments: 5
    },
    {
      id: "top-majors",
      title: currentLanguage === 'kk' ? "Ең сұранысқа ие мамандықтар - 2025" : "Самые востребованные специальности - 2025",
      excerpt: currentLanguage === 'kk' ? "Болашақта сұранысқа ие болатын мамандықтар тізімі және оларға қойылатын талаптар." : "Список специальностей, которые будут востребованы в будущем, и требования к ним.",
      category: currentLanguage === 'kk' ? "Мамандықтар" : "Специальности",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      author: currentLanguage === 'kk' ? "Админ" : "Админ",
      date: currentLanguage === 'kk' ? "5 күн бұрын" : "5 дней назад",
      views: 612,
      likes: 22,
      comments: 7
    }
  ]);

  useEffect(() => {
    // Update post titles and other text when language changes
    const updateLocalizedContent = () => {
      setFeaturedPost(prev => ({
        ...prev,
        title: currentLanguage === 'kk' 
          ? "2025 жылғы үздік университеттер рейтингі жарияланды"
          : "Опубликован рейтинг лучших университетов 2025 года",
        excerpt: currentLanguage === 'kk'
          ? "Қазақстандағы жоғары оқу орындарының жаңа рейтингі жарияланды. Топ үштікте қандай университеттер орын алды?"
          : "Опубликован новый рейтинг высших учебных заведений Казахстана. Какие университеты вошли в топ-3?",
        category: currentLanguage === 'kk' ? "Университеттер" : "Университеты",
        date: currentLanguage === 'kk' ? "2 сағат бұрын" : "2 часа назад",
      }));
      
      // Similarly update blog posts with localized content
      setBlogPosts(prev => prev.map(post => {
        // Just updating the first post as an example - in reality you'd update all
        if (post.id === "ubt-prep") {
          return {
            ...post,
            title: currentLanguage === 'kk' ? "ҰБТға дайындық: маңызды кеңестер" : "Подготовка к ЕНТ: важные советы",
            excerpt: currentLanguage === 'kk' ? "Сарапшылардың ҰБТ-ға дайындық бойынша ұсыныстары" : "Рекомендации экспертов по подготовке к ЕНТ",
            category: currentLanguage === 'kk' ? "ҰБТ" : "ЕНТ",
            date: currentLanguage === 'kk' ? "5 сағат бұрын" : "5 часов назад",
          };
        }
        return post;
      }));
    };
    
    updateLocalizedContent();
  }, [currentLanguage]);

  // Function to update view counts when clicking on blog posts
  const incrementViewCount = (type: 'featured' | 'regular', id: string) => {
    if (type === 'featured') {
      const newViewCount = featuredPost.views + 1;
      setFeaturedPost(prev => ({
        ...prev,
        views: newViewCount
      }));
      
      // Save to localStorage
      localStorage.setItem(`blog_views_${id}`, newViewCount.toString());
    } else if (type === 'regular') {
      const updatedPosts = blogPosts.map(post => {
        if (post.id === id) {
          const newViewCount = post.views + 1;
          localStorage.setItem(`blog_views_${id}`, newViewCount.toString());
          return { ...post, views: newViewCount };
        }
        return post;
      });
      
      setBlogPosts(updatedPosts);
    }
  };
  
  const handleLike = (postId: string) => {
    if (!isAuthenticated) {
      toast({
        title: currentLanguage === 'kk' ? "Авторизация қажет" : "Требуется авторизация",
        description: currentLanguage === 'kk' 
          ? "Лайк басу үшін жүйеге кіруіңіз керек"
          : "Войдите в систему, чтобы поставить лайк",
        variant: "destructive",
      });
      return;
    }
    
    const updatedPosts = blogPosts.map(post => {
      if (post.id === postId) {
        const newLikes = post.likes + 1;
        localStorage.setItem(`blog_likes_${postId}`, newLikes.toString());
        return { ...post, likes: newLikes };
      }
      return post;
    });
    
    setBlogPosts(updatedPosts);
    
    toast({
      title: currentLanguage === 'kk' ? "Лайк қойылды" : "Лайк добавлен",
      description: currentLanguage === 'kk' 
        ? "Мақалаға лайк қойылды" 
        : "Вы поставили лайк статье",
    });
  };
  
  const categories = [
    { id: "all", name: currentLanguage === 'kk' ? "Барлығы" : "Все" },
    { id: "universities", name: currentLanguage === 'kk' ? "Университеттер" : "Университеты" },
    { id: "ent", name: currentLanguage === 'kk' ? "ҰБТ" : "ЕНТ" },
    { id: "grants", name: currentLanguage === 'kk' ? "Гранттар" : "Гранты" },
    { id: "majors", name: currentLanguage === 'kk' ? "Мамандықтар" : "Специальности" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 pt-6 pb-12">
        {/* Page Header with search and filter */}
        <div className="container px-4 md:px-6 mb-8">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              {currentLanguage === 'kk' ? 'Блог' : 'Блог'}
            </h1>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={currentLanguage === 'kk' ? "Іздеу..." : "Поиск..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 min-w-[250px]"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                {currentLanguage === 'kk' ? 'Сүзгі' : 'Фильтр'}
              </Button>
            </div>
          </div>
          
          {/* Category filter tabs */}
          <div className="flex gap-4 mb-6 overflow-x-auto pb-4">
            {categories.map((category) => (
              <Button 
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Featured Post */}
        <div className="container px-4 md:px-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-tandablue text-white text-xs px-2 py-1 rounded-full">
                  {featuredPost.category}
                </span>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {featuredPost.views}
                    </span>
                  </div>
                  
                  <Link to={`/news/${featuredPost.id}`} onClick={() => incrementViewCount('featured', featuredPost.id)} className="block group">
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-tandablue transition-colors">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="flex items-center mr-4">
                      <Heart className="h-4 w-4 mr-1 text-red-500" />
                      {featuredPost.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {featuredPost.comments}
                    </span>
                  </div>
                  
                  <Link to={`/news/${featuredPost.id}`} onClick={() => incrementViewCount('featured', featuredPost.id)}>
                    <Button variant="default" className="bg-tandablue hover:bg-blue-700">
                      {currentLanguage === 'kk' ? 'Оқу' : 'Читать'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Post Grid */}
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">
            {currentLanguage === 'kk' ? 'Соңғы жаңалықтар' : 'Последние новости'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:translate-y-[-5px]">
                <Link to={`/news/${post.id}`} onClick={() => incrementViewCount('regular', post.id)} className="block">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-tandablue text-white text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </Link>
                
                <div className="p-5">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views}
                    </span>
                  </div>
                  
                  <Link to={`/news/${post.id}`} onClick={() => incrementViewCount('regular', post.id)} className="block group">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-tandablue transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{post.excerpt}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <button 
                        onClick={() => handleLike(post.id)} 
                        className="flex items-center mr-3 hover:text-red-500 transition-colors"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{post.likes}</span>
                      </button>
                      
                      <Link 
                        to={`/news/${post.id}#comments`} 
                        className="flex items-center hover:text-tandablue transition-colors"
                        onClick={() => incrementViewCount('regular', post.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{post.comments}</span>
                      </Link>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" className="px-8">
              {currentLanguage === 'kk' ? 'Тағы көру' : 'Смотреть еще'}
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
