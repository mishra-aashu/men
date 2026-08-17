import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../utils/constants';

// We mock calls if Supabase is not configured
const isSupabaseConfigured = SUPABASE_URL && SUPABASE_ANON_KEY;

export const authService = {
  login: async (email, password) => {
    if (!isSupabaseConfigured) {
      // Mock login
      await new Promise(resolve => setTimeout(resolve, 800));
      if (password.length < 6) throw new Error('Password must be at least 6 characters');
      return { user: { id: 'mock-user-id', email, username: email.split('@')[0] }, error: null };
    }
    // Real Supabase auth would go here
    return { user: null, error: 'Not implemented' };
  },

  signUp: async (email, password, metadata) => {
    if (!isSupabaseConfigured) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { user: { id: 'mock-user-id', email, ...metadata }, error: null };
    }
    return { user: null, error: 'Not implemented' };
  },

  signOut: async () => {
    if (!isSupabaseConfigured) return { error: null };
    return { error: null };
  },
};
