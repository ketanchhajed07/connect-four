import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://fdwwcynpeniwlchiqfjk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkd3djeW5wZW5pd2xjaGlxZmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2NzYzNTMsImV4cCI6MjAyNjI1MjM1M30.OPDK_nEtousZnMIT2KJDpW6vP0wHrDcMuXsrAcqoVqI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
