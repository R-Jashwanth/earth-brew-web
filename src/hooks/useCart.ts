import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface CartItem {
  id: string;
  menu_item_id: string;
  quantity: number;
  menu_items: {
    name: string;
    price: number;
    image_url?: string;
  };
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCartItems = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        menu_item_id,
        quantity,
        menu_items (
          name,
          price,
          image_url
        )
      `)
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error loading cart",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setCartItems(data || []);
    }
    setLoading(false);
  };

  const addToCart = async (menuItemId: string, quantity: number = 1) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to add items to cart",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: user.id,
        menu_item_id: menuItemId,
        quantity
      }, {
        onConflict: 'user_id,menu_item_id'
      });

    if (error) {
      toast({
        title: "Error adding to cart",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Added to cart",
        description: "Item successfully added to your cart"
      });
      fetchCartItems();
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId);

    if (error) {
      toast({
        title: "Error updating cart",
        description: error.message,
        variant: "destructive"
      });
    } else {
      fetchCartItems();
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) {
      toast({
        title: "Error removing from cart",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Removed from cart",
        description: "Item removed from your cart"
      });
      fetchCartItems();
    }
  };

  const clearCart = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error clearing cart",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setCartItems([]);
      toast({
        title: "Cart cleared",
        description: "All items removed from your cart"
      });
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => 
      total + (item.menu_items.price * item.quantity), 0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  return {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    refetch: fetchCartItems
  };
};