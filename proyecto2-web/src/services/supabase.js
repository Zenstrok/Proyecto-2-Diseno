import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function insertData(table, data) {
  const { error } = await supabase.from(table).insert([data]);
  if (error) {
    console.error("Error inserting data:", error);
    return false;
  }
  return true;
}
