import { supabase } from "@/integrations/supabase/client";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function groqChat(options: {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
}) {
  const { data, error } = await supabase.functions.invoke("groq-ai", {
    body: options,
  });

  if (error) throw error;
  return data; // Full Groq response
}
