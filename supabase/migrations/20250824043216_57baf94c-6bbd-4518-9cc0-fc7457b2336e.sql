-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name', 
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create menu items table
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  ingredients TEXT[],
  allergens TEXT[],
  is_vegan BOOLEAN DEFAULT false,
  is_organic BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on menu items (public read access)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view menu items" 
ON public.menu_items 
FOR SELECT 
USING (true);

-- Create cart table for user shopping carts
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES public.menu_items(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, menu_item_id)
);

-- Enable RLS on cart items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own cart items" 
ON public.cart_items 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Insert sample menu items
INSERT INTO public.menu_items (name, description, price, category, is_vegan, is_organic, ingredients, allergens) VALUES
('Organic Espresso', 'Rich, full-bodied espresso made from fair-trade organic beans', 3.50, 'Coffee', true, true, ARRAY['Organic coffee beans'], ARRAY[]::TEXT[]),
('Oat Milk Latte', 'Creamy latte made with locally sourced oat milk', 4.75, 'Coffee', true, true, ARRAY['Organic coffee beans', 'Oat milk'], ARRAY['Oats']),
('Sustainable Mocha', 'Decadent chocolate and coffee blend with eco-friendly packaging', 5.25, 'Coffee', false, true, ARRAY['Organic coffee beans', 'Dark chocolate', 'Milk'], ARRAY['Milk', 'Soy']),
('Green Tea Latte', 'Ceremonial grade matcha with your choice of plant milk', 4.50, 'Tea', true, true, ARRAY['Matcha powder', 'Almond milk'], ARRAY['Tree nuts']),
('Avocado Toast', 'Fresh avocado on artisan sourdough with hemp seeds', 8.50, 'Food', true, true, ARRAY['Sourdough bread', 'Avocado', 'Hemp seeds', 'Sea salt'], ARRAY['Gluten']),
('Acai Bowl', 'Antioxidant-rich acai topped with fresh fruits and granola', 12.00, 'Food', true, true, ARRAY['Acai puree', 'Banana', 'Berries', 'Granola', 'Coconut'], ARRAY['Tree nuts']);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0,
  image_url TEXT,
  location TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on events (public read access)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events" 
ON public.events 
FOR SELECT 
USING (true);

-- Create event bookings table
CREATE TABLE public.event_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'confirmed',
  UNIQUE(user_id, event_id)
);

-- Enable RLS on event bookings
ALTER TABLE public.event_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own bookings" 
ON public.event_bookings 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Insert sample events
INSERT INTO public.events (title, description, event_date, duration_minutes, max_attendees, price, location) VALUES
('Coffee Cupping Session', 'Learn about coffee tasting and discover flavor profiles', NOW() + INTERVAL '7 days', 90, 12, 15.00, 'Main Café'),
('Sustainability Workshop', 'Explore eco-friendly practices in coffee production', NOW() + INTERVAL '14 days', 120, 20, 25.00, 'Education Room'),
('Latte Art Masterclass', 'Master the art of creating beautiful latte designs', NOW() + INTERVAL '21 days', 60, 8, 35.00, 'Barista Station');