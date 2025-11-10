-- Fix 1: Ensure reservations SELECT policy doesn't allow NULL user_id
-- Drop and recreate to ensure it's correct
DROP POLICY IF EXISTS "Users can view their own reservations" ON public.reservations;

CREATE POLICY "Users can view their own reservations"
ON public.reservations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Fix 2: Newsletter subscriptions - ensure no public SELECT access
-- (Already correct - no SELECT policy exists, only INSERT allowed)