/*
  # Fix profiles table RLS INSERT policy

  1. Security Changes
    - Drop existing INSERT policy that's blocking user registration
    - Create new INSERT policy allowing authenticated users to insert their own profile
    - Policy condition: auth.uid() = id (users can only insert profiles with their own user ID)

  This fixes the 401 error during user registration by allowing authenticated users
  to create their own profile entries in the profiles table.
*/

-- Drop the existing problematic INSERT policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create a new INSERT policy that properly allows authenticated users to insert their own profile
CREATE POLICY "Allow authenticated users to insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);