
import React from 'react';
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

const featuredPost: BlogPost = {
  id: "university-rankings",
  title: "2025 жылғы үздік университеттер рейтингі жарияланды",
  excerpt: "Қазақстандағы жоғары оқу орындарының жаңа рейтингі жарияланды. Топ үштікте қандай университеттер орын алды?",
  category: "Университеттер",
  image: "public/lovable-uploads/e4f79886-f579-4eb0-a763-e56878426f53.png",
  author: "Админ",
  date: "2 сағат бұрын",
  views: 1700,
  likes: 24,
  comments: 8
};

const blogPosts: BlogPost[] = [
  {
    id: "ubt-prep",
    title: "ҰБТға дайындық: маңызды кеңестер",
    excerpt: "Сарапшылардың ҰБТ-ға дайындық бойынша ұсыныстары",
    category: "ҰБТ",
    image: "public/lovable-uploads/889499f5-f0a0-427c-aa84-b517bc582674.png",
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
    image: "public/lovable-uploads/f8fb1fa5-53bf-4c81-9f71-116f536ed84e.png", 
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
    image: "public/lovable-uploads/18749887-b5ed-45fa-a910-780a05083588.png",
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
    image: "public/lovable-uploads/2926c506-f309-4c28-a09b-0a48de7b0705.png",
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
    image: "public/lovable-uploads/05dca756-56b5-4157-b6cb-da9078ae4dd4.png",
    author: "Админ",
    date: "5 күн бұрын",
    views: 612,
    likes: 22,
    comments: 7
  }
];

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        {/* Featured Post Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="relative h-[400px] overflow-hidden rounded-xl">
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
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="text-blue-600 font-medium">{post.category}</span>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
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
