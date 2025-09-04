-- Create blog_posts table for dynamic blog content
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(user_id),
  author_name TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  image_url TEXT,
  read_time INTEGER DEFAULT 5,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shop_products table for e-commerce functionality
CREATE TABLE public.shop_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  rating NUMERIC DEFAULT 0,
  is_organic BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  stock INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create loyalty_points table for rewards system
CREATE TABLE public.loyalty_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL DEFAULT 0,
  tier TEXT DEFAULT 'Seed',
  total_spent NUMERIC DEFAULT 0,
  visits_this_month INTEGER DEFAULT 0,
  rewards_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create loyalty_transactions table for point history
CREATE TABLE public.loyalty_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earned', 'redeemed', 'bonus')),
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reservations table for table bookings
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  party_size INTEGER NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  location_id TEXT NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter_subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for blog_posts
CREATE POLICY "Anyone can view published blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Authors can manage their own posts" 
ON public.blog_posts 
FOR ALL 
USING (auth.uid() = author_id);

-- Create RLS policies for shop_products
CREATE POLICY "Anyone can view available products" 
ON public.shop_products 
FOR SELECT 
USING (is_available = true);

-- Create RLS policies for loyalty_points
CREATE POLICY "Users can view their own loyalty data" 
ON public.loyalty_points 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own loyalty data" 
ON public.loyalty_points 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own loyalty data" 
ON public.loyalty_points 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for loyalty_transactions
CREATE POLICY "Users can view their own transactions" 
ON public.loyalty_transactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" 
ON public.loyalty_transactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for reservations
CREATE POLICY "Users can view their own reservations" 
ON public.reservations 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can manage their own reservations" 
ON public.reservations 
FOR ALL 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Create RLS policies for newsletter
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own subscription" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (true);

-- Add triggers for updated_at columns
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shop_products_updated_at
BEFORE UPDATE ON public.shop_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_loyalty_points_updated_at
BEFORE UPDATE ON public.loyalty_points
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
BEFORE UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, author_name, category, tags, image_url, read_time, is_published, published_at) VALUES
('The Journey of Fair Trade Coffee: From Farm to Cup', 'fair-trade-coffee-journey', 'Discover how fair trade practices are transforming coffee farming communities and creating better coffee for everyone.', 'Fair trade coffee represents more than just a cup of joe...', 'Sarah Martinez', 'Sustainability', ARRAY['Fair Trade', 'Coffee Farming', 'Ethics'], 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600', 5, true, now() - interval '5 days'),
('Brewing the Perfect Cup: A Guide to Coffee Extraction', 'perfect-coffee-extraction', 'Learn the science behind coffee extraction and how to achieve the perfect balance of flavor in every cup.', 'Coffee extraction is both an art and a science...', 'Marcus Chen', 'Coffee Culture', ARRAY['Brewing', 'Technique', 'Education'], 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600', 7, true, now() - interval '10 days'),
('Zero Waste Coffee Shop: Our Journey to Sustainability', 'zero-waste-journey', 'How we achieved 95% waste diversion and what other businesses can learn from our experience.', 'Our zero waste journey began three years ago...', 'Elena Rodriguez', 'Sustainability', ARRAY['Zero Waste', 'Environment', 'Business'], 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=600', 6, true, now() - interval '15 days');

-- Insert sample shop products
INSERT INTO public.shop_products (name, description, price, category, image_url, rating, is_organic, is_bestseller, stock) VALUES
('Ethiopian Single Origin', 'Premium single-origin coffee beans with floral notes and bright acidity. Ethically sourced from highland farms.', 24.99, 'Coffee Beans', 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400', 4.8, true, true, 25),
('Colombian Dark Roast', 'Rich, full-bodied dark roast with chocolate undertones. Perfect for espresso and French press brewing.', 22.99, 'Coffee Beans', 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', 4.7, true, false, 18),
('Eco Brews French Press', 'Sustainable bamboo and glass French press. Perfect for brewing our premium coffee blends at home.', 45.99, 'Equipment', 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 4.9, false, true, 12),
('Reusable Coffee Cup', 'Eco-friendly bamboo fiber coffee cup with silicone lid. Dishwasher safe and perfect for on-the-go.', 18.99, 'Merchandise', 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400', 4.6, false, false, 35),
('Manual Coffee Grinder', 'Precision ceramic burr grinder for consistent coffee grounds. Compact design perfect for travel.', 89.99, 'Equipment', 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400', 4.8, false, false, 8);