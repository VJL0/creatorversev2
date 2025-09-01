import { createClient } from "@supabase/supabase-js";
import type { Creator } from "@/types";

const URL = "https://yleazilhnpmvqgqdbujd.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZWF6aWxobnBtdnFncWRidWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2OTAwNjQsImV4cCI6MjA3MjI2NjA2NH0.WDsTTuQqDufHpiUdYRomrVoHRK4UiEg1f6mR72qS2Ss";

export const supabase = createClient(URL, API_KEY);

export async function getCreators(): Promise<Creator[]> {
  const { data, error } = await supabase
    .from("creators")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function deleteCreator(id: string): Promise<void> {
  const { error } = await supabase.from("creators").delete().eq("id", id);
  if (error) throw error;
}
export async function getCreator(id: string): Promise<Creator> {
  const { data, error } = await supabase
    .from("creators")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}
export async function updateCreator(creator: Creator): Promise<void> {
  const { error } = await supabase
    .from("creators")
    .update({
      name: creator.name.trim(),
      url: creator.url.trim(),
      description: creator.description.trim(),
      imageURL: creator.imageURL ? creator.imageURL.trim() : null,
    })
    .eq("id", creator.id);
  if (error) throw error;
}
export async function addCreator(creator: Creator): Promise<void> {
  const { error } = await supabase.from("creators").insert({
    name: creator.name.trim(),
    url: creator.url.trim(),
    description: creator.description.trim(),
    imageURL: creator.imageURL?.trim() ?? null,
  });
  if (error) throw error;
}
