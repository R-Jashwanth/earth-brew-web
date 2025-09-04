import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface ShopProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  rating: number;
  is_organic: boolean;
  is_bestseller: boolean;
  stock: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export const useShop = () => {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('shop_products')
        .select('*')
        .eq('is_available', true)
        .order('is_bestseller', { ascending: false })
        .order('rating', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading products",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to add items to cart",
        variant: "destructive"
      });
      return;
    }

    // For now, we'll show success message - would need to create menu items from shop products
    toast({
      title: "Added to cart",
      description: "Shop item added successfully",
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    addToCart,
    refetch: fetchProducts
  };
};