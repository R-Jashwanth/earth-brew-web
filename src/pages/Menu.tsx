import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';
import { Search, Filter, Plus, Leaf, Heart } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  is_available: boolean;
  ingredients: string[];
  allergens: string[];
  is_vegan: boolean;
  is_organic: boolean;
}

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  const categories = ['all', 'Coffee', 'Tea', 'Food'];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [menuItems, searchTerm, selectedCategory]);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('category', { ascending: true });

    if (error) {
      console.error('Error fetching menu items:', error);
    } else {
      setMenuItems(data || []);
    }
    setLoading(false);
  };

  const filterItems = () => {
    let filtered = menuItems;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  };

  const handleAddToCart = async (menuItemId: string) => {
    await addToCart(menuItemId, 1);
  };

  if (loading) {
    return (
      <ThemeProvider defaultTheme="light">
        <div className="min-h-screen bg-background">
          <Header />
          <div className="pt-20 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading menu...</p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-hsl(var(--earth-green)) to-hsl(var(--sage-green)) text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
                Our Sustainable Menu
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Discover ethically sourced coffee and eco-friendly treats
              </p>
            </div>
          </section>

          {/* Filter Section */}
          <section className="py-8 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid grid-cols-4 w-full md:w-auto">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category} className="capitalize">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </section>

          {/* Menu Items */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-hsl(var(--earth-green))/20 to-hsl(var(--sage-green))/20 flex items-center justify-center">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl">☕</div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <span className="text-xl font-bold text-hsl(var(--earth-green))">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {item.is_vegan && (
                          <Badge variant="secondary" className="text-xs">
                            <Leaf className="h-3 w-3 mr-1" />
                            Vegan
                          </Badge>
                        )}
                        {item.is_organic && (
                          <Badge variant="secondary" className="text-xs">
                            <Heart className="h-3 w-3 mr-1" />
                            Organic
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      
                      {item.ingredients && item.ingredients.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          <strong>Ingredients:</strong> {item.ingredients.join(', ')}
                        </div>
                      )}
                      
                      {item.allergens && item.allergens.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          <strong>Allergens:</strong> {item.allergens.join(', ')}
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => handleAddToCart(item.id)}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredItems.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">
                    No items found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Menu;