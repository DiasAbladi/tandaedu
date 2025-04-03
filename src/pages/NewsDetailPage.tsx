
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  ChevronLeft, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2,
  Send
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from '@/contexts/AuthContext';
import { LanguageContext } from '@/contexts/LanguageContext';

interface NewsArticle {
  id: string;
  title: {
    kk: string;
    ru: string;
  };
  category: {
    kk: string;
    ru: string;
  };
  image: string;
  content: {
    kk: string;
    ru: string;
  };
  author: {
    kk: string;
    ru: string;
  };
  date: string;
  views: number;
  likes: number;
  comments: Comment[];
  relatedArticles: RelatedArticle[];
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  text: string;
  date: string;
}

interface RelatedArticle {
  id: string;
  title: {
    kk: string;
    ru: string;
  };
  image: string;
  date: string;
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useContext(AuthContext);
  const { currentLanguage } = useContext(LanguageContext);
  const { toast } = useToast();
  
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    // Mock fetch article data
    setTimeout(() => {
      const mockArticle: NewsArticle = {
        id: id || 'default-id',
        title: {
          kk: 'Жаңа оқу жылында қандай өзгерістер күтеді?',
          ru: 'Какие изменения ожидаются в новом учебном году?'
        },
        category: {
          kk: 'Білім',
          ru: 'Образование'
        },
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        content: {
          kk: `<p>Жаңа 2025 оқу жылына байланысты Қазақстан Республикасының білім жүйесіне бірқатар өзгерістер енгізіледі. Бұл өзгерістер оқушылар мен студенттердің білім алу процесін жақсартуға бағытталған.</p>
               <h3>Негізгі өзгерістер:</h3>
               <ul>
                 <li>Цифрлық технологияларды оқу процесіне кеңінен енгізу</li>
                 <li>Оқушылардың дербес жұмыс дағдыларын дамыту</li>
                 <li>Шет тілдерін оқыту жүйесін жаңарту</li>
                 <li>Инклюзивті білім беру жүйесін кеңейту</li>
               </ul>
               <p>Сонымен қатар, оқу-әдістемелік кешендер жаңартылып, педагогикалық кадрларды даярлау бағдарламалары қайта қаралады. Мұғалімдердің біліктілігін арттыру курстары да жаңа форматта өткізілмек.</p>
               <p>Жоғары оқу орындарында студенттердің тәжірибелік дағдыларын дамытуға көбірек көңіл бөлінеді. Оқу бағдарламалары нарық талаптарына сәйкес өзгертіліп, жаңа мамандықтар енгізіледі.</p>
               <p>Бұл өзгерістер қазіргі білім жүйесін жаңартып, оқушылар мен студенттерді болашақта бәсекеге қабілетті маман болуға дайындайды.</p>`,
          ru: `<p>В новом учебном году 2025 в систему образования Республики Казахстан будет внесен ряд изменений. Эти изменения направлены на улучшение процесса обучения школьников и студентов.</p>
               <h3>Основные изменения:</h3>
               <ul>
                 <li>Широкое внедрение цифровых технологий в учебный процесс</li>
                 <li>Развитие навыков самостоятельной работы учащихся</li>
                 <li>Обновление системы обучения иностранным языкам</li>
                 <li>Расширение системы инклюзивного образования</li>
               </ul>
               <p>Кроме того, будут обновлены учебно-методические комплексы и пересмотрены программы подготовки педагогических кадров. Курсы повышения квалификации учителей также будут проводиться в новом формате.</p>
               <p>В высших учебных заведениях больше внимания будет уделяться развитию практических навыков студентов. Учебные программы будут изменены в соответствии с требованиями рынка, и будут введены новые специальности.</p>
               <p>Эти изменения обновят существующую систему образования и подготовят школьников и студентов к тому, чтобы стать конкурентоспособными специалистами в будущем.</p>`
        },
        author: {
          kk: 'Ахметов Нұрлан',
          ru: 'Ахметов Нурлан'
        },
        date: '2025-03-15',
        views: Number(localStorage.getItem(`article-${id}-views`)) || 0,
        likes: Number(localStorage.getItem(`article-${id}-likes`)) || 0,
        comments: JSON.parse(localStorage.getItem(`article-${id}-comments`) || '[]'),
        relatedArticles: [
          {
            id: 'university-rankings',
            title: {
              kk: '2025 жылғы үздік университеттер рейтингі жарияланды',
              ru: 'Опубликован рейтинг лучших университетов 2025 года'
            },
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            date: '2025-03-10'
          },
          {
            id: 'grants-2025',
            title: {
              kk: '2025 жылғы мемлекеттік грант иегерлері анықталды',
              ru: 'Определены обладатели государственных грантов 2025 года'
            },
            image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            date: '2025-03-05'
          },
          {
            id: 'new-university',
            title: {
              kk: 'Жаңа университет ашылады',
              ru: 'Открывается новый университет'
            },
            image: 'https://images.unsplash.com/photo-1498322590555-139c697a8abe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            date: '2025-02-28'
          }
        ]
      };
      
      // Increment the view count by 1
      const updatedViews = mockArticle.views + 1;
      mockArticle.views = updatedViews;
      localStorage.setItem(`article-${id}-views`, updatedViews.toString());
      
      // Check if the user has liked this article
      const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
      setIsLiked(likedArticles.includes(id));
      
      setArticle(mockArticle);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: currentLanguage === 'kk' ? "Кіру қажет" : "Необходимо войти",
        description: currentLanguage === 'kk' 
          ? "Лайк қою үшін жүйеге кіру қажет" 
          : "Необходимо войти в систему, чтобы поставить лайк",
        variant: "destructive"
      });
      return;
    }
    
    if (article) {
      // Toggle like status
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      
      // Update the likes count in article
      const updatedLikes = newIsLiked ? article.likes + 1 : article.likes - 1;
      setArticle({
        ...article,
        likes: updatedLikes
      });
      
      // Update localStorage
      localStorage.setItem(`article-${id}-likes`, updatedLikes.toString());
      
      // Update liked articles array
      const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
      if (newIsLiked) {
        if (!likedArticles.includes(id)) {
          likedArticles.push(id);
        }
      } else {
        const index = likedArticles.indexOf(id);
        if (index > -1) {
          likedArticles.splice(index, 1);
        }
      }
      localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
    }
  };
  
  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      toast({
        title: currentLanguage === 'kk' ? "Кіру қажет" : "Необходимо войти",
        description: currentLanguage === 'kk' 
          ? "Пікір қалдыру үшін жүйеге кіру қажет" 
          : "Необходимо войти в систему, чтобы оставить комментарий",
        variant: "destructive"
      });
      return;
    }
    
    if (!commentText.trim()) {
      toast({
        title: currentLanguage === 'kk' ? "Бос пікір" : "Пустой комментарий",
        description: currentLanguage === 'kk' 
          ? "Пікір мәтіні бос болмауы керек" 
          : "Текст комментария не может быть пустым",
        variant: "destructive"
      });
      return;
    }
    
    if (article) {
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        user: {
          name: "Пайдаланушы",
          avatar: undefined
        },
        text: commentText,
        date: new Date().toISOString()
      };
      
      const updatedComments = [...article.comments, newComment];
      
      setArticle({
        ...article,
        comments: updatedComments
      });
      
      localStorage.setItem(`article-${id}-comments`, JSON.stringify(updatedComments));
      setCommentText('');
      
      toast({
        title: currentLanguage === 'kk' ? "Пікір қосылды" : "Комментарий добавлен",
        description: currentLanguage === 'kk' 
          ? "Сіздің пікіріңіз сәтті қосылды" 
          : "Ваш комментарий успешно добавлен",
      });
    }
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'kk' ? 'kk-KZ' : 'ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="h-96 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
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
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-2xl font-bold mb-4">
              {currentLanguage === 'kk' ? 'Мақала табылмады' : 'Статья не найдена'}
            </h1>
            <p className="text-gray-600 mb-6">
              {currentLanguage === 'kk' 
                ? 'Сіз іздеген мақала табылмады немесе қолжетімді емес' 
                : 'Запрашиваемая статья не найдена или недоступна'}
            </p>
            <Link to="/news">
              <Button variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                {currentLanguage === 'kk' ? 'Жаңалықтарға оралу' : 'Вернуться к новостям'}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:underline">
              {currentLanguage === 'kk' ? 'Басты бет' : 'Главная'}
            </Link>
            <span className="mx-2">/</span>
            <Link to="/news" className="hover:underline">
              {currentLanguage === 'kk' ? 'Жаңалықтар' : 'Новости'}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">
              {article.title[currentLanguage]}
            </span>
          </div>
          
          <div className="mb-10">
            <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
              {article.category[currentLanguage]}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title[currentLanguage]}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(article.date)}
              </div>
              <div className="flex items-center">
                <Eye className="mr-2 h-4 w-4" />
                {article.views}
              </div>
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                {article.comments.length}
              </div>
            </div>
            
            <div className="border-t border-b py-4 mb-8">
              <div className="flex items-center">
                <span className="font-medium mr-2">
                  {currentLanguage === 'kk' ? 'Автор:' : 'Автор:'}
                </span>
                {article.author[currentLanguage]}
              </div>
            </div>
          </div>
          
          <div className="mb-10">
            <div className="mb-8">
              <img 
                src={article.image} 
                alt={article.title[currentLanguage]}
                className="w-full h-auto rounded-lg object-cover max-h-[500px]"
              />
            </div>
            
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content[currentLanguage] }}></div>
          </div>
          
          <div className="flex items-center justify-between py-4 border-t border-b mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                {article.likes}
              </button>
              <button className="flex items-center gap-1 text-gray-600">
                <MessageSquare className="h-5 w-5" />
                {article.comments.length}
              </button>
              <button className="flex items-center gap-1 text-gray-600">
                <Share2 className="h-5 w-5" />
                {currentLanguage === 'kk' ? 'Бөлісу' : 'Поделиться'}
              </button>
            </div>
            
            <Link to="/news">
              <Button variant="outline" size="sm">
                <ChevronLeft className="mr-2 h-4 w-4" />
                {currentLanguage === 'kk' ? 'Барлық жаңалықтар' : 'Все новости'}
              </Button>
            </Link>
          </div>
          
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">
              {currentLanguage === 'kk' ? 'Пікірлер' : 'Комментарии'} ({article.comments.length})
            </h2>
            
            <div className="mb-8">
              <div className="flex gap-4 mb-4">
                <Textarea 
                  placeholder={currentLanguage === 'kk' ? 'Пікіріңізді қалдырыңыз...' : 'Оставьте ваш комментарий...'}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSubmitComment}>
                  <Send className="mr-2 h-4 w-4" />
                  {currentLanguage === 'kk' ? 'Жіберу' : 'Отправить'}
                </Button>
              </div>
            </div>
            
            {article.comments.length > 0 ? (
              <div className="space-y-6">
                {article.comments.map(comment => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{comment.user.name}</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.date)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg">
                <MessageSquare className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">
                  {currentLanguage === 'kk' ? 'Пікірлер жоқ. Алғашқы пікір қалдырыңыз!' : 'Нет комментариев. Будьте первым, кто оставит комментарий!'}
                </p>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-6">
              {currentLanguage === 'kk' ? 'Ұқсас жаңалықтар' : 'Похожие новости'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.relatedArticles.map(relatedArticle => (
                <Link 
                  key={relatedArticle.id} 
                  to={`/news/${relatedArticle.id}`}
                  className="block group"
                >
                  <div className="rounded-lg overflow-hidden mb-3">
                    <img 
                      src={relatedArticle.image} 
                      alt={relatedArticle.title[currentLanguage]}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {relatedArticle.title[currentLanguage]}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="mr-1 h-4 w-4" />
                    {formatDate(relatedArticle.date)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsDetailPage;
