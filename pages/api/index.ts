import { createClient } from '@supabase/supabase-js';

const API_URL = 'https://nlqzeospdnhtkksjkdpz.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5scXplb3NwZG5odGtrc2prZHB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1NjcwODExMCwiZXhwIjoxOTcyMjg0MTEwfQ.tgd7z56robmKMd_cw-Y-3j0lt_WFNiD6d24fPPi8MKA';

const api = createClient(API_URL, API_KEY);

export default api;
