import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useLoyalty } from '@/hooks/useLoyalty';
import { Star, Gift, Coffee, Leaf, Crown, Zap } from 'lucide-react';

const Loyalty = () => {
  const { user } = useAuth();
  const { loyaltyData, transactions, loading, redeemPoints } = useLoyalty();

  const tiers = [
    {
      name: 'Seed',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      minPoints: 0,
      benefits: ['5% off drinks', 'Birthday reward', 'Member-only events']
    },
    {
      name: 'Green',
      icon: Coffee,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      minPoints: 500,
      benefits: ['10% off drinks', 'Free drink every 10 visits', 'Priority ordering', 'Exclusive tastings']
    },
    {
      name: 'Gold',
      icon: Crown,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      minPoints: 2000,
      benefits: ['15% off everything', 'Free drink every 8 visits', 'Free pastry monthly', 'VIP events']
    },
    {
      name: 'Platinum',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      minPoints: 5000,
      benefits: ['20% off everything', 'Free drink every 5 visits', 'Free bag of beans monthly', 'Personal barista consultations']
    }
  ];

  const rewards = [
    {
      id: 1,
      name: 'Free Coffee',
      points: 100,
      description: 'Any size coffee drink',
      icon: Coffee,
      available: true
    },
    {
      id: 2,
      name: 'Free Pastry',
      points: 150,
      description: 'Any pastry or baked good',
      icon: Gift,
      available: true
    },
    {
      id: 3,
      name: 'Coffee Beans (1lb)',
      points: 300,
      description: 'Premium single-origin beans',
      icon: Leaf,
      available: true
    },
    {
      id: 4,
      name: 'Eco Mug',
      points: 500,
      description: 'Reusable bamboo coffee mug',
      icon: Coffee,
      available: false
    },
    {
      id: 5,
      name: 'Private Tasting',
      points: 1000,
      description: 'Personal coffee tasting session',
      icon: Star,
      available: false
    }
  ];

  const recentActivity = [
    { date: '2024-01-20', action: 'Purchase', points: 25, description: 'Oat Milk Latte + Avocado Toast' },
    { date: '2024-01-18', action: 'Reward', points: -100, description: 'Redeemed: Free Coffee' },
    { date: '2024-01-15', action: 'Purchase', points: 15, description: 'Ethiopian Single Origin' },
    { date: '2024-01-12', action: 'Bonus', points: 50, description: 'Sustainability Challenge Completed' },
    { date: '2024-01-10', action: 'Purchase', points: 30, description: 'Green Tea Latte + Acai Bowl' }
  ];

  const currentTier = loyaltyData ? tiers.find(tier => tier.name === loyaltyData.tier) : tiers[0];
  const nextTierIndex = currentTier ? tiers.findIndex(tier => tier.name === currentTier.name) + 1 : 1;
  const nextTierData = nextTierIndex < tiers.length ? tiers[nextTierIndex] : null;
  const progressPercentage = loyaltyData && nextTierData 
    ? ((loyaltyData.points - (currentTier?.minPoints || 0)) / (nextTierData.minPoints - (currentTier?.minPoints || 0))) * 100
    : 0;

  const handleRedeemReward = async (rewardId: number, points: number, name: string) => {
    if (loyaltyData && loyaltyData.points >= points) {
      await redeemPoints(points, name);
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
                Eco Rewards
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Earn points for every purchase and sustainable action. Redeem for rewards that matter.
              </p>
            </div>
          </section>

          {/* Points Overview */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Points Card */}
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl">Your Eco Points</CardTitle>
                        {currentTier && (
                          <Badge className={`${currentTier.bgColor} ${currentTier.color} border-0`}>
                            <currentTier.icon className="h-4 w-4 mr-1" />
                            {currentTier.name} Member
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="text-center">
                         <div className="text-5xl font-bold text-hsl(var(--earth-green)) mb-2">
                           {loyaltyData?.points.toLocaleString() || '0'}
                         </div>
                         <p className="text-muted-foreground">Available Points</p>
                       </div>

                       {nextTierData && (
                         <div className="space-y-3">
                           <div className="flex justify-between text-sm">
                             <span>Progress to {nextTierData.name}</span>
                             <span>{Math.max(0, nextTierData.minPoints - (loyaltyData?.points || 0))} points to go</span>
                           </div>
                           <Progress value={Math.max(0, Math.min(100, progressPercentage))} className="h-3" />
                         </div>
                       )}

                       <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                         <div className="text-center">
                           <div className="text-2xl font-bold text-hsl(var(--earth-green))">
                             ${loyaltyData?.total_spent.toFixed(2) || '0.00'}
                           </div>
                           <p className="text-xs text-muted-foreground">Total Spent</p>
                         </div>
                         <div className="text-center">
                           <div className="text-2xl font-bold text-hsl(var(--earth-green))">
                             {loyaltyData?.visits_this_month || 0}
                           </div>
                           <p className="text-xs text-muted-foreground">Visits This Month</p>
                         </div>
                         <div className="text-center">
                           <div className="text-2xl font-bold text-hsl(var(--earth-green))">
                             {loyaltyData?.rewards_earned || 0}
                           </div>
                           <p className="text-xs text-muted-foreground">Rewards Earned</p>
                         </div>
                       </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Tier Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {currentTier && <currentTier.icon className="h-5 w-5" />}
                      Your Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentTier?.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-hsl(var(--earth-green))" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Membership Tiers */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair text-hsl(var(--earth-brown)) mb-4">
                  Membership Tiers
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Unlock more benefits as you earn points and support sustainability
                </p>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {tiers.map((tier, index) => (
                   <Card key={index} className={`relative ${loyaltyData?.tier === tier.name ? 'ring-2 ring-hsl(var(--earth-green))' : ''}`}>
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 ${tier.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <tier.icon className={`h-8 w-8 ${tier.color}`} />
                      </div>
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {tier.minPoints.toLocaleString()}+ points
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {tier.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <Star className="h-3 w-3 text-hsl(var(--earth-green))" />
                            <span className="text-xs">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                     {loyaltyData?.tier === tier.name && (
                       <div className="absolute -top-2 -right-2">
                         <Badge className="bg-hsl(var(--earth-green))">Current</Badge>
                       </div>
                     )}
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Available Rewards */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair text-hsl(var(--earth-brown)) mb-4">
                  Redeem Rewards
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Use your points to get free drinks, food, and exclusive merchandise
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className={`${!reward.available ? 'opacity-60' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-hsl(var(--earth-green))/10 rounded-full flex items-center justify-center">
                            <reward.icon className="h-6 w-6 text-hsl(var(--earth-green))" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{reward.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{reward.description}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-hsl(var(--earth-green))">
                          {reward.points} pts
                        </div>
                         <Button 
                           onClick={() => handleRedeemReward(reward.id, reward.points, reward.name)}
                           disabled={!reward.available || !loyaltyData || loyaltyData.points < reward.points}
                           size="sm"
                         >
                           {!loyaltyData || loyaltyData.points < reward.points ? 'Not Enough Points' : 'Redeem'}
                         </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold font-playfair text-hsl(var(--earth-brown)) mb-8 text-center">
                  Recent Activity
                </h2>
                
                 <Card>
                   <CardContent className="p-0">
                     <div className="divide-y">
                       {transactions.map((transaction, index) => (
                         <div key={index} className="p-4 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                               transaction.type === 'earned' ? 'bg-green-100 text-green-600' :
                               transaction.type === 'redeemed' ? 'bg-blue-100 text-blue-600' :
                               'bg-yellow-100 text-yellow-600'
                             }`}>
                               {transaction.type === 'earned' ? <Coffee className="h-5 w-5" /> :
                                transaction.type === 'redeemed' ? <Gift className="h-5 w-5" /> :
                                <Star className="h-5 w-5" />}
                             </div>
                             <div>
                               <p className="font-medium">{transaction.description}</p>
                               <p className="text-sm text-muted-foreground">
                                 {new Date(transaction.created_at).toLocaleDateString()}
                               </p>
                             </div>
                           </div>
                           <div className={`font-bold ${transaction.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                             {transaction.points > 0 ? '+' : ''}{transaction.points} pts
                           </div>
                         </div>
                       ))}
                       {transactions.length === 0 && (
                         <div className="p-8 text-center text-muted-foreground">
                           <p>No transactions yet. Start earning points by making purchases!</p>
                         </div>
                       )}
                     </div>
                   </CardContent>
                 </Card>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Loyalty;