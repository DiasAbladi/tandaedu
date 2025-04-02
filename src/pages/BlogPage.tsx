
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Clock, Eye, Heart, MessageSquare, Share2, Search, Filter } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  views: number;
  likes?: number;
  comments?: number;
}

const BlogPage: React.FC = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogPost>({
    id: "university-rankings",
    title: "2025 жылғы үздік университеттер рейтингі жарияланды",
    excerpt: "Қазақстандағы жоғары оқу орындарының жаңа рейтингі жарияланды. Топ үштікте қандай университеттер орын алды?",
    category: "Университеттер",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    author: "Админ",
    date: "2 сағат бұрын",
    views: 1700,
    likes: 24,
    comments: 8
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "ubt-prep",
      title: "ҰБТға дайындық: маңызды кеңестер",
      excerpt: "Сарапшылардың ҰБТ-ға дайындық бойынша ұсыныстары",
      category: "ҰБТ",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      author: "Админ",
      date: "5 сағат бұрын",
      views: 856,
      likes: 15,
      comments: 3
    },
    {
      id: "grants-2025",
      title: "2025 жылғы мемлекеттік грант иегерлері анықталды",
      excerpt: "Биылғы грант иегерлерінің толық тізімі. Қандай мамандықтарға көп грант бөлінді?",
      category: "Гранттар",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
      author: "Админ",
      date: "1 күн бұрын",
      views: 1500,
      likes: 32,
      comments: 12
    },
    {
      id: "student-conferences",
      title: "Жаңа оқу жылында енгізілетін өзгерістер",
      excerpt: "2025 жылғы оқу жылында күтілетін маңызды өзгерістер мен жаңартулар.",
      category: "Білім",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      author: "Админ",
      date: "3 күн бұрын",
      views: 423,
      likes: 9,
      comments: 2
    },
    {
      id: "new-university",
      title: "Жаңа университет ашылады",
      excerpt: "Алматыда жаңартылған дизайнмен жергілікті жаңа университет ашылады",
      category: "Университеттер",
      image: "https://images.unsplash.com/photo-1498322590555-139c697a8abe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      author: "Админ",
      date: "4 күн бұрын",
      views: 755,
      likes: 18,
      comments: 5
    },
    {
      id: "top-majors",
      title: "Ең сұранысқа ие мамандықтар - 2025",
      excerpt: "Болашақта сұранысқа ие болатын мамандықтар тізімі және оларға қойылатын талаптар.",
      category: "Мамандықтар",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      author: "Админ",
      date: "5 күн бұрын",
      views: 612,
      likes: 22,
      comments: 7
    }
  ]);

  // Function to update view counts when clicking on blog posts
  const incrementViewCount = (type: 'featured' | 'regular', id: string) => {
    if (type === 'featured') {
      setFeaturedPost(prev => ({
        ...prev,
        views: prev.views + 1
      }));
    } else if (type === 'regular') {
      setBlogPosts(prev => 
        prev.map(post => 
          post.id === id ? { ...post, views: post.views + 1 } : post
        )
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        {/* Featured Post Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="relative h-[400px] overflow-hidden rounded-xl">
              <Link to={`/news/${featuredPost.id}`} onClick={() => incrementViewCount('featured', featuredPost.id)}>
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center text-sm mb-2">
                    <span className="bg-blue-600 text-xs px-2 py-1 rounded-full mr-2">{featuredPost.category}</span>
                    <span className="flex items-center mr-3">
                      <Clock className="h-4 w-4 mr-1" /> {featuredPost.date}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" /> {featuredPost.views}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-200 mb-4 max-w-xl">{featuredPost.excerpt}</p>
                  <Button variant="default">Оқу</Button>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Blog Posts Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Соңғы жаңалықтар</h2>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" className="flex items-center">
                  <Search className="h-4 w-4 mr-2" /> Іздеу
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" /> Сүзгі
                </Button>
              </div>
            </div>
            
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
              {["Барлығы", "ҰБТ", "Гранттар", "Университеттер", "Мамандықтар"].map((category, index) => (
                <Button 
                  key={category}
                  variant={index === 0 ? "default" : "outline"}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg border overflow-hidden shadow-sm">
                  <Link to={`/news/${post.id}`} onClick={() => incrementViewCount('regular', post.id)}>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="text-blue-600 font-medium">{post.category}</span>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                    <Link to={`/news/${post.id}`} className="block" onClick={() => incrementViewCount('regular', post.id)}>
                      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{post.excerpt}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
                        <span className="mr-3">{post.views}</span>
                        <Heart className="h-4 w-4 mr-1" />
                        <span className="mr-3">{post.likes}</span>
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{post.comments}</span>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button>Тағы көру</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
