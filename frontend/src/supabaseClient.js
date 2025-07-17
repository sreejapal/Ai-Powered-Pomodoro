import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://isgvrbrcrczegasjanya.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzZ3ZyYnJjcmN6ZWdhc2phbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NTY2ODYsImV4cCI6MjA2ODMzMjY4Nn0.llziqXSGxpUh7LkxxxwQfcqly7NrCTCZtY32XgXljeY';

export const supabase = createClient(supabaseUrl, supabaseKey);
