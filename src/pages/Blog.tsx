import { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBlog } from '@/hooks/useBlog';
import { Search, Calendar, User, ArrowRight, Coffee, Leaf, Heart } from 'lucide-react';
import { format } from 'date-fns';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { posts: blogPosts, loading } = useBlog();

  const categories = ['all', 'Sustainability', 'Coffee Culture', 'Community'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Sustainability':
        return Leaf;
      case 'Coffee Culture':
        return Coffee;
      case 'Community':
        return Heart;
      default:
        return Coffee;
    }
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-hsl(var(--earth-green)) to-hsl(var(--sage-green)) text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
                Coffee Stories & Insights
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Discover the world of sustainable coffee culture, brewing techniques, and community impact
              </p>
            </div>
          </section>

          {/* Featured Post */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-12">
                <h2 className="text-3xl font-bold font-playfair text-hsl(var(--earth-brown)) mb-8">Featured Article</h2>
                 <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                   <div className="grid grid-cols-1 lg:grid-cols-2">
                     <div className="aspect-video lg:aspect-square">
                       <img 
                         src={featuredPost.image_url || 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                         alt={featuredPost.title}
                         className="w-full h-full object-cover"
                       />
                     </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary">{featuredPost.category}</Badge>
                        <span className="text-sm text-muted-foreground">{featuredPost.read_time} min read</span>
                      </div>
                      <h3 className="text-2xl font-bold font-playfair text-hsl(var(--earth-brown)) mb-4">
                        {featuredPost.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                           <div className="flex items-center gap-1">
                             <User className="h-4 w-4" />
                             {featuredPost.author_name}
                           </div>
                           <div className="flex items-center gap-1">
                             <Calendar className="h-4 w-4" />
                             {format(new Date(featuredPost.published_at || featuredPost.created_at), 'MMM dd, yyyy')}
                           </div>
                        </div>
                        <Button>
                          Read More
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Search and Filter */}
          <section className="py-8 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => {
                  const CategoryIcon = getCategoryIcon(post.category);
                  return (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                       <div className="aspect-video">
                         <img 
                           src={post.image_url || 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                           alt={post.title}
                           className="w-full h-full object-cover"
                         />
                       </div>
                      
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <CategoryIcon className="h-4 w-4 text-hsl(var(--earth-green))" />
                            <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{post.read_time} min read</span>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t">
                           <div className="flex items-center gap-4 text-xs text-muted-foreground">
                             <div className="flex items-center gap-1">
                               <User className="h-3 w-3" />
                               {post.author_name}
                             </div>
                             <div className="flex items-center gap-1">
                               <Calendar className="h-3 w-3" />
                               {format(new Date(post.published_at || post.created_at), 'MMM dd')}
                             </div>
                           </div>
                          <Button size="sm" variant="ghost">
                            Read More
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <Coffee className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    No articles found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="py-16 bg-hsl(var(--earth-green)) text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold font-playfair mb-4">
                Stay Updated
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest articles, brewing tips, and sustainability insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
                <Button variant="secondary">
                  Subscribe
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Blog;