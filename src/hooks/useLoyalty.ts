import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface LoyaltyData {
  id: string;
  user_id: string;
  points: number;
  tier: string;
  total_spent: number;
  visits_this_month: number;
  rewards_earned: number;
  created_at: string;
  updated_at: string;
}

interface LoyaltyTransaction {
  id: string;
  user_id: string;
  points: number;
  type: 'earned' | 'redeemed' | 'bonus';
  description: string;
  created_at: string;
}

export const useLoyalty = () => {
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyData | null>(null);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchLoyaltyData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) {
        // Create initial loyalty record
        const { data: newLoyalty, error: createError } = await supabase
          .from('loyalty_points')
          .insert({
            user_id: user.id,
            points: 0,
            tier: 'Seed',
            total_spent: 0,
            visits_this_month: 0,
            rewards_earned: 0
          })
          .select()
          .single();
          
        if (createError) throw createError;
        setLoyaltyData(newLoyalty);
      } else {
        setLoyaltyData(data);
      }
    } catch (error: any) {
      toast({
        title: "Error loading loyalty data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('loyalty_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions((data as LoyaltyTransaction[]) || []);
    } catch (error: any) {
      console.error('Error loading transactions:', error);
    }
  };

  const addPoints = async (points: number, description: string) => {
    if (!user || !loyaltyData) return;

    try {
      // Add transaction
      const { error: transError } = await supabase
        .from('loyalty_transactions')
        .insert({
          user_id: user.id,
          points: points,
          type: 'earned',
          description: description
        });

      if (transError) throw transError;

      // Update loyalty points
      const newPoints = loyaltyData.points + points;
      const { error: updateError } = await supabase
        .from('loyalty_points')
        .update({ points: newPoints })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      await fetchLoyaltyData();
      await fetchTransactions();

      toast({
        title: "Points earned!",
        description: `You earned ${points} points for ${description}`,
      });
    } catch (error: any) {
      toast({
        title: "Error adding points",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const redeemPoints = async (points: number, description: string) => {
    if (!user || !loyaltyData || loyaltyData.points < points) return;

    try {
      // Add transaction
      const { error: transError } = await supabase
        .from('loyalty_transactions')
        .insert({
          user_id: user.id,
          points: -points,
          type: 'redeemed',
          description: description
        });

      if (transError) throw transError;

      // Update loyalty points
      const newPoints = loyaltyData.points - points;
      const newRewardsEarned = loyaltyData.rewards_earned + 1;
      
      const { error: updateError } = await supabase
        .from('loyalty_points')
        .update({ 
          points: newPoints,
          rewards_earned: newRewardsEarned
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      await fetchLoyaltyData();
      await fetchTransactions();

      toast({
        title: "Reward redeemed!",
        description: `You redeemed ${description}`,
      });
    } catch (error: any) {
      toast({
        title: "Error redeeming reward",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchLoyaltyData();
    fetchTransactions();
  }, [user]);

  return {
    loyaltyData,
    transactions,
    loading,
    addPoints,
    redeemPoints,
    refetch: fetchLoyaltyData
  };
};