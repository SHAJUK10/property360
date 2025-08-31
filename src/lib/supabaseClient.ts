import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          phone: string;
          role: string;
          service_name: string | null;
          bio: string | null;
          location: string | null;
          price: string | null;
          profile_image: string | null;
          banner_image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          phone: string;
          role: string;
          service_name?: string | null;
          bio?: string | null;
          location?: string | null;
          price?: string | null;
          profile_image?: string | null;
          banner_image?: string | null;
        };
        Update: {
          name?: string;
          phone?: string;
          role?: string;
          service_name?: string | null;
          bio?: string | null;
          location?: string | null;
          price?: string | null;
          profile_image?: string | null;
          banner_image?: string | null;
          updated_at?: string;
        };
      };
    };
  };
};