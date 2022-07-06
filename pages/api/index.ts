import { createClient } from '@supabase/supabase-js';

const api = createClient(process.env.API_URL!, process.env.API_KEY!);

export default api;
