
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
  // Add other articles' data here
};

// Add data for all the other article IDs we're using
const additionalArticles: Record<string, NewsArticle> = {
  "university-rating-2025": {
    id: "university-rating-2025",
    title: "2025 жылғы үздік университеттер рейтингі жарияланды",
    category: "Университеттер",
    date: "2 сәуір 2025",
    author: "Ахметов Нұрлан",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: [
      "Қазақстанда 2025 жылдың үздік университеттерінің рейтингі жарияланды. Бұл рейтинг еліміздегі жоғары оқу орындарының сапасын, білім беру деңгейін және ғылыми зерттеулерін бағалайды.",
      
      "Рейтингтің ең жоғарғы орнында Әл-Фараби атындағы Қазақ ұлттық университеті тұр. Бұл университет соңғы жылдары білім беру сапасын арттырып, халықаралық серіктестіктерді дамытты, сонымен қатар ғылыми жарияланымдар саны бойынша да көш бастап тұр.",
    ],
    views: 1700,
    likes: 24,
    comments: []
  },
  "ubt-preparation": {
    id: "ubt-preparation",
    title: "ҰБТға дайындық: маңызды кеңестер",
    category: "ҰБТ",
    date: "1 сәуір 2025",
    author: "Бейсенова Гүлназ",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    content: [
      "ҰБТға дайындық кезінде студенттер көптеген қиындықтарға тап болады. Мұнда біз ең маңызды кеңестерді ұсынамыз.",
      
      "Бірінші кеңес - уақытыңызды дұрыс жоспарлаңыз. Барлық пәндерге тең көңіл бөлу маңызды.",
    ],
    views: 856,
    likes: 15,
    comments: []
  },
  "grants-2025": {
    id: "grants-2025",
    title: "2025 жылғы мемлекеттік грант иегерлері анықталды",
    category: "Гранттар",
    date: "31 наурыз 2025",
    author: "Серікқалиев Дәурен",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    content: [
      "2025 жылғы мемлекеттік білім грантының иегерлері анықталды. Биыл грант саны өткен жылмен салыстырғанда 15% өсті.",
      
      "Техникалық мамандықтар бойынша грант саны ең көп бөлінді, одан кейін педагогикалық және медициналық мамандықтар.",
    ],
    views: 1500,
    likes: 30,
    comments: []
  },
  "student-conferences": {
    id: "student-conferences",
    title: "Жаңа оқу жылында өткізілетін әлеуметтер",
    category: "Білім",
    date: "30 наурыз 2025",
    author: "Қасымов Арман",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    content: [
      "2025-2026 оқу жылында студенттерге арналған көптеген конференциялар мен іс-шаралар жоспарланған.",
      
      "Халықаралық студенттік форум, ғылыми конференциялар және стартап байқаулары студенттерге өз білімдерін көрсетуге мүмкіндік береді.",
    ],
    views: 423,
    likes: 24,
    comments: []
  },
  "new-university": {
    id: "new-university",
    title: "Жаңа университет ашылады",
    category: "Университеттер",
    date: "29 наурыз 2025",
    author: "Исмағұлов Руслан",
    image: "https://images.unsplash.com/photo-1498322590555-139c697a8abe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
    content: [
      "Алматы қаласында жаңа халықаралық технологиялық университет ашылады. Университет заманауи оқыту әдістерін қолдануға бағытталған.",
      
      "Жаңа оқу орнына шетелдік профессорлар мен мамандар тартылады, білім беру бағдарламалары халықаралық стандарттарға сәйкес жасалады.",
    ],
    views: 755,
    likes: 35,
    comments: []
  },
  "top-majors": {
    id: "top-majors",
    title: "Ең сұранысқа ие мамандықтар - 2025",
    category: "Мамандықтар",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    date: "28 наурыз 2025",
    author: "Жұмабаева Әсел",
    content: [
      "2025 жылы еңбек нарығында ең сұранысқа ие мамандықтардың тізімі жарияланды. IT саласы көш бастап тұр.",
      
      "Сонымен қатар, жасанды интеллект мамандары, деректерді талдаушылар және киберқауіпсіздік саласындағы мамандар да жоғары сұранысқа ие.",
    ],
    views: 612,
    likes: 48,
    comments: []
  }
};

// Merge the two article sources
Object.assign(newsArticles, additionalArticles);

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("article");
  const [newComment, setNewComment] = useState("");
  const [localLikes, setLocalLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<{id: string; author: string; date: string; text: string;}[]>([]);
  
  const { isAuthenticated, user } = useContext(AuthContext);
  const { currentLanguage, translations } = useContext(LanguageContext);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API fetch
    const fetchArticle = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        if (id && newsArticles[id]) {
          // Check if user has already viewed this article
          let hasViewed = false;
          
          if (isAuthenticated && user) {
            const userId = user.id;
            const viewedArticles = JSON.parse(localStorage.getItem(`user_viewed_articles_${userId}`) || '[]');
            hasViewed = viewedArticles.includes(id);
            
            // Track this view if not already viewed
            if (!hasViewed) {
              viewedArticles.push(id);
              localStorage.setItem(`user_viewed_articles_${userId}`, JSON.stringify(viewedArticles));
            }
            
            // Check if user has liked this article
            const likedArticles = JSON.parse(localStorage.getItem(`user_liked_articles_${userId}`) || '[]');
            setHasLiked(likedArticles.includes(id));
          }
          
          // Get stored views from localStorage or use the default
          const storedViews = localStorage.getItem(`news_views_${id}`);
          const viewsCount = storedViews ? parseInt(storedViews, 10) : newsArticles[id].views;
          
          // Increment views only if user hasn't viewed before
          const newViewsCount = hasViewed ? viewsCount : viewsCount + 1;
          localStorage.setItem(`news_views_${id}`, newViewsCount.toString());
          
          // Get stored likes from localStorage
          const storedLikes = localStorage.getItem(`news_likes_${id}`);
          const likesCount = storedLikes ? parseInt(storedLikes, 10) : newsArticles[id].likes;
          setLocalLikes(likesCount);
          
          // Get stored comments from localStorage
          const storedComments = localStorage.getItem(`news_comments_${id}`);
          const commentsArray = storedComments ? JSON.parse(storedComments) : newsArticles[id].comments;
          setComments(commentsArray);
          
          // Update article with new view count
          setArticle({
            ...newsArticles[id],
            views: newViewsCount,
            likes: likesCount,
            comments: commentsArray
          });
        }
        setIsLoading(false);
      }, 800);
    };
    
    fetchArticle();
  }, [id, isAuthenticated, user]);
  
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
    
    if (article && !hasLiked) {
      // Update user's liked articles
      const userId = user!.id;
      const likedArticles = JSON.parse(localStorage.getItem(`user_liked_articles_${userId}`) || '[]');
      likedArticles.push(article.id);
      localStorage.setItem(`user_liked_articles_${userId}`, JSON.stringify(likedArticles));
      
      // Update like count
      const newLikesCount = localLikes + 1;
      setLocalLikes(newLikesCount);
      setHasLiked(true);
      
      // Save to localStorage
      localStorage.setItem(`news_likes_${article.id}`, newLikesCount.toString());
      
      // Update article state
      setArticle(prev => prev ? {...prev, likes: newLikesCount} : null);
      
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
      
      // Create new comment object
      const newCommentObject = {
        id: commentId,
        author: user!.name,
        date: new Date().toLocaleDateString(),
        text: newComment
      };
      
      // Update comments state
      const updatedComments = [...comments, newCommentObject];
      setComments(updatedComments);
      
      // Save to localStorage
      localStorage.setItem(`news_comments_${article.id}`, JSON.stringify(updatedComments));
      
      // Update article state
      setArticle({
        ...article,
        comments: updatedComments
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
                {currentLanguage === 'kk' ? `Пікірлер (${comments.length})` : `Комментарии (${comments.length})`}
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
                    <Button 
                      variant="ghost" 
                      className={`flex items-center ${hasLiked ? 'text-red-500' : ''}`} 
                      onClick={handleLike}
                      disabled={hasLiked}
                    >
                      <Heart className={`h-5 w-5 mr-2 ${hasLiked ? 'fill-current' : ''}`} />
                      <span>{localLikes}</span>
                    </Button>
                    <Button variant="ghost" className="flex items-center" onClick={() => setActiveTab("comments")}>
                      <MessageSquare className="h-5 w-5 mr-2" />
                      <span>{comments.length}</span>
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
                  {comments.length > 0 ? (
                    comments.map(comment => (
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
