
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, Share2, ArrowLeft, Eye, CalendarDays, User } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import { LanguageContext } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  content: string[];
  views: number;
  likes: number;
  comments: {
    id: string;
    author: string;
    date: string;
    text: string;
  }[];
}

// Mock data to simulate loading from an API
const newsArticles: Record<string, NewsArticle> = {
  "university-rankings": {
    id: "university-rankings",
    title: "2025 жылғы үздік университеттер рейтингі жарияланды",
    category: "Университеттер",
    date: "2 сәуір 2025",
    author: "Ахметов Нұрлан",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: [
      "Қазақстанда 2025 жылдың үздік университеттерінің рейтингі жарияланды. Бұл рейтинг еліміздегі жоғары оқу орындарының сапасын, білім беру деңгейін және ғылыми зерттеулерін бағалайды.",
      
      "Рейтингтің ең жоғарғы орнында Әл-Фараби атындағы Қазақ ұлттық университеті тұр. Бұл университет соңғы жылдары білім беру сапасын арттырып, халықаралық серіктестіктерді дамытты, сонымен қатар ғылыми жарияланымдар саны бойынша да көш бастап тұр.",
      
      "Екінші орынға Назарбаев Университеті орналасты. Бұл оқу орны инновациялық тәсілдерімен және халықаралық стандарттарға сай білім берумен танымал. Университет студенттерге жан-жақты даму мүмкіндіктерін ұсынады және халықаралық байланыстары арқылы ерекшеленеді.",
      
      "Үздік үштікті Л.Н. Гумилев атындағы Еуразия ұлттық университеті түйіндейді. Бұл университет гуманитарлық және жаратылыстану ғылымдары бағыттары бойынша мықты білім беру бағдарламаларымен танымал. Сонымен қатар, ғылыми зерттеулер саласындағы жетістіктері де жоғары бағаланды.",
      
      "Рейтингті құрастыру барысында жоғары оқу орындарының академиялық беделі, оқытушы-профессорлық құрамның біліктілігі, ғылыми зерттеу жұмыстарының сапасы, түлектердің жұмысқа орналасу көрсеткіштері және халықаралық қарым-қатынастары секілді факторлар ескерілді.",
      
      "Биылғы рейтингте ерекше көрініс тапқан тенденция – техникалық және IT мамандықтарының танымалдылығының өсуі. Бұл бағыттарға сұраныс артып келе жатқандықтан, университеттер де осы салаларға көбірек көңіл бөлуде.",
      
      "Рейтинг нәтижелері абитуриенттер мен олардың ата-аналарына, сондай-ақ жұмыс берушілерге таңдау жасауға көмектесетін маңызды ақпарат болып табылады. Дегенмен, мамандар университетті таңдау кезінде тек рейтингке ғана емес, сонымен қатар жеке қызығушылықтар мен мақсаттарға да назар аудару керектігін еске салады."
    ],
    views: 1700,
    likes: 24,
    comments: [
      {
        id: "comment1",
        author: "Асқар",
        date: "2 сәуір 2025",
        text: "Өте пайдалы ақпарат, рахмет!"
      },
      {
        id: "comment2",
        author: "Айгүл",
        date: "2 сәуір 2025",
        text: "Менің ұлым осы жылы мектеп бітіреді, бұл рейтинг университет таңдауда үлкен көмек болды."
      }
    ]
  },
  // More articles can be added here
};

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("article");
  const [newComment, setNewComment] = useState("");
  const [localLikes, setLocalLikes] = useState(0);
  const { isAuthenticated } = useContext(AuthContext);
  const { currentLanguage, translations } = useContext(LanguageContext);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API fetch
    const fetchArticle = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        if (id && newsArticles[id]) {
          // Get stored views from localStorage or use the default
          const storedViews = localStorage.getItem(`news_views_${id}`);
          const viewsCount = storedViews ? parseInt(storedViews, 10) : newsArticles[id].views;
          
          // Increment views
          const newViewsCount = viewsCount + 1;
          localStorage.setItem(`news_views_${id}`, newViewsCount.toString());
          
          // Get stored likes from localStorage
          const storedLikes = localStorage.getItem(`news_likes_${id}`);
          const likesCount = storedLikes ? parseInt(storedLikes, 10) : newsArticles[id].likes;
          setLocalLikes(likesCount);
          
          // Update article with new view count
          setArticle({
            ...newsArticles[id],
            views: newViewsCount,
            likes: likesCount,
          });
        }
        setIsLoading(false);
      }, 800);
    };
    
    fetchArticle();
  }, [id]);
  
  const handleLike = () => {
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
    
    if (article) {
      // Toggle like
      const newLikesCount = localLikes + 1;
      setLocalLikes(newLikesCount);
      
      // Save to localStorage
      localStorage.setItem(`news_likes_${article.id}`, newLikesCount.toString());
      
      toast({
        title: currentLanguage === 'kk' ? "Лайк қойылды" : "Лайк добавлен",
        description: currentLanguage === 'kk' 
          ? "Мақалаға лайк қойылды" 
          : "Вы поставили лайк статье",
      });
    }
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: currentLanguage === 'kk' ? "Авторизация қажет" : "Требуется авторизация",
        description: currentLanguage === 'kk' 
          ? "Пікір қалдыру үшін жүйеге кіруіңіз керек" 
          : "Войдите в систему, чтобы оставить комментарий",
        variant: "destructive",
      });
      return;
    }
    
    if (newComment.trim() === "") {
      toast({
        title: currentLanguage === 'kk' ? "Қате" : "Ошибка",
        description: currentLanguage === 'kk' 
          ? "Пікір мәтіні бос болмауы керек" 
          : "Текст комментария не может быть пустым",
        variant: "destructive",
      });
      return;
    }
    
    if (article) {
      // Generate unique id for the comment
      const commentId = `comment_${Date.now()}`;
      
      // Get stored comments or initialize empty array
      const storedComments = localStorage.getItem(`news_comments_${article.id}`);
      const currentComments = storedComments ? JSON.parse(storedComments) : [];
      
      // Add new comment
      const newCommentObject = {
        id: commentId,
        author: "Пайдаланушы", // This would be the current user's name in a real app
        date: new Date().toLocaleDateString(),
        text: newComment
      };
      
      const updatedComments = [...currentComments, newCommentObject];
      
      // Save to localStorage
      localStorage.setItem(`news_comments_${article.id}`, JSON.stringify(updatedComments));
      
      // Update article state
      setArticle({
        ...article,
        comments: [...article.comments, newCommentObject]
      });
      
      // Clear input
      setNewComment("");
      
      toast({
        title: currentLanguage === 'kk' ? "Пікір қосылды" : "Комментарий добавлен",
        description: currentLanguage === 'kk' 
          ? "Сіздің пікіріңіз жарияланды" 
          : "Ваш комментарий опубликован",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gray-50 py-12">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gray-50 py-12">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">
              {currentLanguage === 'kk' ? 'Мақала табылмады' : 'Статья не найдена'}
            </h1>
            <p className="text-gray-600 mb-6">
              {currentLanguage === 'kk' 
                ? 'Сіз іздеген мақала табылмады немесе жойылған.'
                : 'Запрашиваемая статья не найдена или была удалена.'}
            </p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentLanguage === 'kk' ? 'Артқа қайту' : 'Вернуться назад'}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        {/* Hero section with image and title */}
        <div className="w-full h-[400px] relative">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto text-white pb-8">
              <div className="flex items-center text-sm mb-2">
                <span className="bg-tandablue text-white px-3 py-1 rounded-full mr-2">
                  {article.category}
                </span>
                <span className="flex items-center mr-4">
                  <CalendarDays className="h-4 w-4 mr-1" /> 
                  {article.date}
                </span>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" /> 
                  {article.views}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {article.title}
              </h1>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" /> 
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article content and comments */}
        <div className="container px-4 md:px-6 py-8 max-w-4xl mx-auto">
          <Tabs defaultValue="article" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full border-b border-gray-200 bg-transparent">
              <TabsTrigger value="article" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-tandablue">
                {currentLanguage === 'kk' ? 'Мақала' : 'Статья'}
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-tandablue">
                {currentLanguage === 'kk' ? `Пікірлер (${article.comments.length})` : `Комментарии (${article.comments.length})`}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="article" className="p-0">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <article className="prose max-w-none">
                  {article.content.map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </article>
                
                <div className="border-t pt-4 mt-8 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="flex items-center" onClick={handleLike}>
                      <Heart className="h-5 w-5 mr-2 text-red-500" />
                      <span>{localLikes}</span>
                    </Button>
                    <Button variant="ghost" className="flex items-center" onClick={() => setActiveTab("comments")}>
                      <MessageSquare className="h-5 w-5 mr-2" />
                      <span>{article.comments.length}</span>
                    </Button>
                  </div>
                  
                  <Button variant="ghost" className="flex items-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    <span>{currentLanguage === 'kk' ? 'Бөлісу' : 'Поделиться'}</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="comments" className="p-0">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">
                  {currentLanguage === 'kk' ? 'Пікірлер' : 'Комментарии'}
                </h3>
                
                <div className="space-y-4 mb-6">
                  {article.comments.length > 0 ? (
                    article.comments.map(comment => (
                      <div key={comment.id} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{comment.author}</div>
                          <div className="text-sm text-gray-500">{comment.date}</div>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      {currentLanguage === 'kk' ? 'Әзірге пікірлер жоқ' : 'Пока нет комментариев'}
                    </p>
                  )}
                </div>
                
                <form onSubmit={handleAddComment} className="mt-6">
                  <h4 className="font-medium mb-2">
                    {currentLanguage === 'kk' ? 'Пікір қалдыру' : 'Оставить комментарий'}
                  </h4>
                  <textarea
                    className="w-full p-3 border rounded-md min-h-[100px] mb-3"
                    placeholder={currentLanguage === 'kk' ? 'Пікіріңізді жазыңыз...' : 'Напишите ваш комментарий...'}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                  <Button type="submit" className="bg-tandablue hover:bg-blue-700">
                    {currentLanguage === 'kk' ? 'Жіберу' : 'Отправить'}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">
              {currentLanguage === 'kk' ? 'Ұқсас мақалалар' : 'Похожие статьи'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* This would be populated with actual related articles */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534009916851-7850ba974f9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Related article" 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium mb-2 line-clamp-2">
                    {currentLanguage === 'kk' ? 'Жоғары білім туралы жаңа реформалар' : 'Новые реформы в высшем образовании'}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>1.04.2025</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Related article" 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium mb-2 line-clamp-2">
                    {currentLanguage === 'kk' ? 'Студенттер арасындағы зерттеу жұмыстары' : 'Исследовательские работы среди студентов'}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>28.03.2025</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1529007196863-d07650a3f0b9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Related article" 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium mb-2 line-clamp-2">
                    {currentLanguage === 'kk' ? 'Халықаралық білім бағдарламалары' : 'Международные образовательные программы'}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>25.03.2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsDetailPage;
