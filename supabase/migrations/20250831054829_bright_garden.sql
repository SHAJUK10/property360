
-- Drop any existing INSERT policy on the profiles table that might be causing issues
-- This ensures we start fresh with the correct policy.
DROP POLICY IF EXISTS "Allow authenticated users to insert own profile" ON public.profiles;

-- Create the correct RLS policy for INSERT operations on the profiles table.
-- This policy allows an authenticated user to insert a new profile row
-- ONLY if the 'id' column of that new row matches their own authenticated user ID (auth.uid()).
CREATE POLICY "Allow authenticated users to insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);
