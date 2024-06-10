import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.getUserFromRequest = async (request) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) return { user: null, error: 'No token provided' };
  
    const { data, error } = await supabase.auth.getUser(token);
    return { user: data.user, error };
  };