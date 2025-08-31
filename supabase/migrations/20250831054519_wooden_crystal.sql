/*
  # Fix profiles table INSERT policy

  1. Security Changes
    - Drop existing INSERT policy for profiles table
    - Create new INSERT policy with proper WITH CHECK clause
    - Allow authenticated users to insert their own profile data

  This fixes the RLS violation error during user registration.
*/

-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create a new INSERT policy with proper WITH CHECK clause
CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);