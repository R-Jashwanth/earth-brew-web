import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useShop } from '@/hooks/useShop';
import { Search, Plus, Star, Leaf, Coffee, ShoppingBag } from 'lucide-react';

const Shop = () => {
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { products: shopItems, loading, addToCart } = useShop();

  const categories = ['all', 'Coffee Beans', 'Equipment', 'Merchandise', 'Gift Cards'];

  useEffect(() => {
    filterItems();
  }, [shopItems, searchTerm, selectedCategory]);

  const filterItems = () => {
    let filtered = shopItems;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  };

  const handleAddToCart = async (itemId: string) => {
    await addToCart(itemId);
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
                Eco Shop
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Premium coffee beans, sustainable equipment, and eco-friendly merchandise
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
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid grid-cols-5 w-full md:w-auto">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category} className="text-xs">
                        {category === 'all' ? 'All' : category.split(' ')[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-hsl(var(--earth-green))/20 to-hsl(var(--sage-green))/20 relative">
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.is_bestseller && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-hsl(var(--earth-green)) text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Bestseller
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <span className="text-xl font-bold text-hsl(var(--earth-green))">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {item.is_organic && (
                          <Badge variant="secondary" className="text-xs">
                            <Leaf className="h-3 w-3 mr-1" />
                            Organic
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        {item.stock < 10 && (
                          <Badge variant="destructive" className="text-xs">
                            Low Stock
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <strong>In Stock:</strong> {item.stock} items
                      </div>
                      
                      <Button 
                        onClick={() => handleAddToCart(item.id)}
                        className="w-full"
                        disabled={item.stock === 0}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredItems.length === 0 && (
                <div className="text-center py-16">
                  <Coffee className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    No products found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-hsl(var(--earth-green))/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8 text-hsl(var(--earth-green))" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Sustainable Products</h3>
                  <p className="text-sm text-muted-foreground">All our products are ethically sourced and environmentally friendly</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-hsl(var(--earth-green))/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee className="h-8 w-8 text-hsl(var(--earth-green))" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground">Hand-selected products that meet our high standards for quality</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-hsl(var(--earth-green))/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-8 w-8 text-hsl(var(--earth-green))" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
                  <p className="text-sm text-muted-foreground">Free shipping on orders over $50 with carbon-neutral delivery</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Shop;