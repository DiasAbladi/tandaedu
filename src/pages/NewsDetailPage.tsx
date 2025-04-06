
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Send,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AuthContext } from '@/contexts/AuthContext';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";

// News data model
interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  views: number;
  likes: number;
}

// Comment model
interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
  likes: number;
  likedBy: string[];
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useContext(AuthContext);
  const { currentLanguage } = useContext(LanguageContext);
  const { toast } = useToast();
  
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  
  // Load news data
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock data
          const newsData: NewsItem = {
            id: id || "",
            title: id === "university-rating-2025" 
              ? "2025 жылғы үздік университеттер рейтингі жарияланды" 
              : id === "ubt-preparation"
              ? "ҰБТға дайындық: маңызды кеңестер"
              : id === "grants-2025" 
              ? "2025 жылғы мемлекеттік грант иегерлері анықталды"
              : id === "student-conferences"
              ? "Жаңа оқу жылында өткізілетін әлеуметтер"
              : id === "new-university"
              ? "Жаңа университет ашылады"
              : "Ең сұранысқа ие мамандықтар - 2025",
            content: `
              <p class="mb-4">Қазақстандағы жоғары оқу орындарының жаңартылған рейтингі жарияланды. Биылғы жылдың үздік университеттері анықталды.</p>
              
              <h2 class="text-xl font-bold mb-3">Үздік үштік</h2>
              <p class="mb-4">1. Әл-Фараби атындағы Қазақ ұлттық университеті (ҚазҰУ)</p>
              <p class="mb-4">2. Л.Н. Гумилев атындағы Еуразия ұлттық университеті (ЕҰУ)</p>
              <p class="mb-4">3. Назарбаев Университеті</p>
              
              <h2 class="text-xl font-bold mb-3">Бағалау критерийлері</h2>
              <p class="mb-4">Бұл рейтинг бірнеше факторлар бойынша құрастырылған:</p>
              <ul class="list-disc pl-5 mb-4">
                <li>Оқу процесінің сапасы</li>
                <li>Ғылыми қызметтің нәтижелілігі</li>
                <li>Халықаралық ынтымақтастық</li>
                <li>Түлектердің жұмысқа орналасуы</li>
                <li>Инфрақұрылым және материалдық-техникалық база</li>
              </ul>
              
              <p class="mb-4">Биылғы жылы рейтингтегі қазақстандық университеттердің жалпы көрсеткіштері өткен жылмен салыстырғанда жақсарғаны байқалады. Әсіресе халықаралық ынтымақтастық және ғылыми жарияланымдар саны бойынша елеулі өсім байқалады.</p>
              
              <h2 class="text-xl font-bold mb-3">Жетістіктер мен қиындықтар</h2>
              <p class="mb-4">Рейтингте көрсетілгендей, қазақстандық жоғары оқу орындары цифрландыру мен инновациялық технологияларды енгізу бағытында үлкен жетістіктерге жетуде. Алайда, кейбір университеттерде әлі де материалдық-техникалық база мен студенттік инфрақұрылымның жеткіліксіздігі байқалады.</p>
              
              <p class="mb-4">Сарапшылар атап өткендей, алдағы жылдары жоғары оқу орындарының басты мақсаты – білім беру сапасын арттырумен қатар, цифрлық дағдыларды дамыту және еңбек нарығының өзгермелі талаптарына бейімделу болмақ.</p>
            `,
            category: id === "university-rating-2025" || id === "new-university"
              ? "Университеттер"
              : id === "ubt-preparation"
              ? "ҰБТ"
              : id === "grants-2025"
              ? "Гранттар"
              : id === "student-conferences"
              ? "Білім"
              : "Мамандықтар",
            image: id === "university-rating-2025"
              ? "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              : id === "ubt-preparation"
              ? "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              : id === "grants-2025"
              ? "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
              : id === "student-conferences"
              ? "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              : id === "new-university"
              ? "https://images.unsplash.com/photo-1498322590555-139c697a8abe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80"
              : "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            author: "Админ",
            date: id === "university-rating-2025"
              ? "2 сағат бұрын"
              : id === "ubt-preparation"
              ? "5 сағат бұрын"
              : id === "grants-2025"
              ? "1 күн бұрын"
              : id === "student-conferences"
              ? "3 күн бұрын"
              : id === "new-university"
              ? "4 күн бұрын"
              : "5 күн бұрын",
            views: 0,
            likes: 0
          };
          
          setNews(newsData);
          setLoading(false);
          
          // Increment view count
          incrementViewCount(id || "");
        }, 500);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };
    
    fetchNewsDetail();
    
    // Load comments
    loadComments();
  }, [id]);
  
  // Function to load comments
  const loadComments = () => {
    if (!id) return;
    
    const storedComments = localStorage.getItem(`news_comments_${id}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  };
  
  // Function to increment view count
  const incrementViewCount = (newsId: string) => {
    if (!isAuthenticated || !user) return;
    
    const userId = user.id;
    const viewedArticles = JSON.parse(localStorage.getItem(`user_viewed_articles_${userId}`) || '[]');
    const hasViewed = viewedArticles.includes(newsId);
    
    if (!hasViewed) {
      // Add article to user's viewed list
      viewedArticles.push(newsId);
      localStorage.setItem(`user_viewed_articles_${userId}`, JSON.stringify(viewedArticles));
      
      // Update view count in localStorage
      const storedViews = localStorage.getItem(`news_views_${newsId}`);
      const currentViews = storedViews ? parseInt(storedViews, 10) : 0;
      const newViewCount = currentViews + 1;
      localStorage.setItem(`news_views_${newsId}`, newViewCount.toString());
      
      // Update state
      setNews(prev => prev ? {...prev, views: newViewCount} : null);
    } else {
      // Retrieve current view count
      const storedViews = localStorage.getItem(`news_views_${newsId}`);
      const currentViews = storedViews ? parseInt(storedViews, 10) : 0;
      setNews(prev => prev ? {...prev, views: currentViews} : null);
    }
  };
  
  // Function to handle liking a news article
  const handleLikeNews = () => {
    if (!isAuthenticated) {
      toast({
        title: "Кіру қажет",
        description: "Лайк басу үшін жүйеге кіріңіз",
        variant: "default"
      });
      return;
    }
    
    if (!user || !news || !id) return;
    
    const userId = user.id;
    const likedArticles = JSON.parse(localStorage.getItem(`user_liked_articles_${userId}`) || '[]');
    const hasLiked = likedArticles.includes(id);
    
    if (hasLiked) {
      toast({
        title: "Лайк қойылған",
        description: "Сіз бұл жаңалыққа лайк бастыңыз",
        variant: "default"
      });
      return;
    }
    
    // Add article to user's liked list
    likedArticles.push(id);
    localStorage.setItem(`user_liked_articles_${userId}`, JSON.stringify(likedArticles));
    
    // Update like count in localStorage
    const storedLikes = localStorage.getItem(`news_likes_${id}`);
    const currentLikes = storedLikes ? parseInt(storedLikes, 10) : 0;
    const newLikeCount = currentLikes + 1;
    localStorage.setItem(`news_likes_${id}`, newLikeCount.toString());
    
    // Update state
    setNews(prev => prev ? {...prev, likes: newLikeCount} : null);
    
    toast({
      title: "Лайк қойылды",
      description: "Рахмет, сіздің дауысыңыз қабылданды",
      variant: "default"
    });
  };
  
  // Function to submit a new comment
  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      toast({
        title: "Кіру қажет",
        description: "Пікір қалдыру үшін жүйеге кіріңіз",
        variant: "default"
      });
      return;
    }
    
    if (!commentText.trim() || !user || !id) {
      toast({
        title: "Қате",
        description: "Пікір мәтіні бос болмауы керек",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmittingComment(true);
    
    try {
      // Create new comment
      const newComment: Comment = {
        id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
        userName: user.name,
        text: commentText,
        timestamp: new Date().toISOString(),
        likes: 0,
        likedBy: []
      };
      
      // Add to existing comments
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      
      // Store in localStorage
      localStorage.setItem(`news_comments_${id}`, JSON.stringify(updatedComments));
      
      // Reset form
      setCommentText("");
      
      toast({
        title: "Пікір қосылды",
        description: "Сіздің пікіріңіз сәтті қосылды",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Қате",
        description: "Пікір қосу кезінде қате орын алды",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };
  
  // Function to handle liking a comment
  const handleLikeComment = (commentId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Кіру қажет",
        description: "Пікірге лайк басу үшін жүйеге кіріңіз",
        variant: "default"
      });
      return;
    }
    
    if (!user || !id) return;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        // Check if user already liked this comment
        if (comment.likedBy.includes(user.id)) {
          toast({
            title: "Лайк қойылған",
            description: "Сіз бұл пікірге лайк бастыңыз",
            variant: "default"
          });
          return comment;
        }
        
        // Add user to likedBy and increment like count
        return {
          ...comment,
          likes: comment.likes + 1,
          likedBy: [...comment.likedBy, user.id]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    localStorage.setItem(`news_comments_${id}`, JSON.stringify(updatedComments));
    
    toast({
      title: "Лайк қойылды",
      description: "Пікірге лайк қойылды",
      variant: "default"
    });
  };
  
  // Function to delete a comment
  const handleDeleteComment = (commentId: string) => {
    if (!isAuthenticated || !user || !id) return;
    
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem(`news_comments_${id}`, JSON.stringify(updatedComments));
    
    toast({
      title: "Пікір жойылды",
      description: "Сіздің пікіріңіз сәтті жойылды",
    });
  };
  
  // Format date for display
  const formatTimestamp = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      return `${date.toLocaleDateString('kk-KZ')} ${date.toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' })}`;
    } catch (e) {
      return "Белгісіз уақыт";
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-8 w-2/3 mb-4" />
          <Skeleton className="h-6 w-1/3 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Жаңалық табылмады</h1>
          <p className="mb-8">Сұралған жаңалық табылмады немесе жойылған</p>
          <Button asChild>
            <Link to="/news">Жаңалықтар бетіне оралу</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <article className="container mx-auto px-4 md:px-6 py-12">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <Link 
                to="/news"
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                {news.category}
              </Link>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {news.date}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {news.views}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{news.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-medium">{news.author.charAt(0)}</span>
                </div>
                <span className="font-medium">{news.author}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleLikeNews}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{news.likes}</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  asChild
                >
                  <a href="#comments">
                    <MessageSquare className="h-4 w-4" />
                    <span>{comments.length}</span>
                  </a>
                </Button>
                
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>Бөлісу</span>
                </Button>
              </div>
            </div>
          </header>
          
          {/* Featured image */}
          <div className="mb-8">
            <img 
              src={news.image} 
              alt={news.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-lg"
            />
          </div>
          
          {/* Article content */}
          <div 
            className="prose max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
          
          {/* Comments section */}
          <section id="comments" className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              Пікірлер ({comments.length})
            </h2>
            
            {/* Comment form */}
            <div className="mb-8">
              <Textarea
                placeholder={isAuthenticated ? "Пікіріңізді жазыңыз..." : "Пікір қалдыру үшін жүйеге кіріңіз"}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="mb-3 min-h-[100px]"
                disabled={!isAuthenticated || isSubmittingComment}
              />
              
              <div className="flex justify-end">
                <Button 
                  className="flex items-center gap-2"
                  onClick={handleSubmitComment}
                  disabled={!isAuthenticated || !commentText.trim() || isSubmittingComment}
                >
                  <Send className="h-4 w-4" />
                  Жіберу
                </Button>
              </div>
            </div>
            
            {/* Comments list */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Әзірге пікірлер жоқ. Бірінші болып пікір қалдырыңыз!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-blue-600 font-medium">{comment.userName.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{comment.userName}</p>
                          <p className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</p>
                        </div>
                      </div>
                      
                      {isAuthenticated && user && comment.userId === user.id && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Пікірді жою</AlertDialogTitle>
                              <AlertDialogDescription>
                                Сіз шынымен бұл пікірді жойғыңыз келе ме? Бұл әрекетті кері қайтару мүмкін емес.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Болдырмау</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteComment(comment.id)}>
                                Жою
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                    
                    <p className="mb-3">{comment.text}</p>
                    
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 flex items-center gap-1 text-gray-500 hover:text-blue-600"
                        onClick={() => handleLikeComment(comment.id)}
                        disabled={!isAuthenticated}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{comment.likes}</span>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsDetailPage;
