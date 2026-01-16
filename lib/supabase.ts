import { createClient } from '@supabase/supabase-js';
import { Database } from '../types_db';

/**
 * SUPABASE CONFIGURATION
 * We use environment variables by default. 
 * If missing, we fall back to the project details provided to prevent the app from crashing.
 * Note: 'sb_publishable_...' looks like a Stripe key; if authentication fails, 
 * please ensure you are using the Supabase 'anon' (public) key from your dashboard.
 */
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ewcodwkeoxwrmxetrvfm.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_Cnlf5AZru_An89ccleZIVA_pguTtE63';

const createDummyClient = () => {
  console.warn("Supabase credentials missing or invalid. Using dummy client to prevent crash.");
  const dummyResponse = { data: null, error: { message: "Supabase not configured" } };
  
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => dummyResponse,
      signUp: async () => dummyResponse,
      signOut: async () => ({ error: null }),
      signInWithOAuth: async () => dummyResponse,
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => dummyResponse,
          select: async () => dummyResponse,
        }),
      }),
      upsert: () => ({
        select: async () => dummyResponse,
      }),
    }),
  } as any;
};

// Check if we have valid-looking credentials to prevent the "supabaseUrl is required" error
// The URL must be a non-empty string starting with http.
const hasValidUrl = SUPABASE_URL && 
                   typeof SUPABASE_URL === 'string' && 
                   SUPABASE_URL.startsWith('http') && 
                   SUPABASE_URL !== 'undefined';

export const supabase = hasValidUrl
  ? createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
  : createDummyClient();

/**
 * Helper to fetch the current user's profile
 */
export const getProfile = async (userId: string) => {
  if (!hasValidUrl) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error fetching profile:", err);
    return null;
  }
};

/**
 * Helper to register a new AI interaction or update existing one
 */
export const logAIInteraction = async (userId: string, guruType: string, history: any[]) => {
  if (!hasValidUrl) return null;
  try {
    const { data, error } = await supabase
      .from('ai_interactions')
      .upsert({
        user_id: userId,
        guru_type: guruType,
        history: history,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id, guru_type' })
      .select();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error logging interaction:", err);
    return null;
  }
};
