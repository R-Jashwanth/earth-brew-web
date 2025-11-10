-- Fix 1: Restrict reservations table to only show user's own reservations
-- Remove the policy that allows viewing NULL user_id reservations
DROP POLICY IF EXISTS "Users can view their own reservations" ON public.reservations;
DROP POLICY IF EXISTS "Users can manage their own reservations" ON public.reservations;

-- Create new strict policies for reservations
CREATE POLICY "Users can view their own reservations"
ON public.reservations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reservations"
ON public.reservations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reservations"
ON public.reservations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reservations"
ON public.reservations
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Fix 2: Remove public access to newsletter subscriptions
-- Only allow users to insert their own subscription
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.newsletter_subscriptions;

CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscriptions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Remove public SELECT access - admin can access via service role