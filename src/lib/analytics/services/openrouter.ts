import { supabase } from "@/integrations/supabase/client";
import { FullDSAAnalytics } from "../types";
import { buildDSAContext } from "./contextBuilder";

export class OpenRouterService {
  static async invokeChat(
    message: string, 
    analytics: FullDSAAnalytics | null,
    conversationId?: string
  ): Promise<{ reply: string, conversation_id: string }> {
    
    let dsaContext = "";
    if (analytics) {
      dsaContext = buildDSAContext(analytics);
    }

    const { data, error } = await supabase.functions.invoke("syncpilot-chat", {
      body: {
        message,
        mode: "dsa_mentor",
        dsaContext,
        conversation_id: conversationId,
      }
    });

    if (error) {
      console.error("Error calling OpenRouter via edge function:", error);
      throw error;
    }

    return {
      reply: data.reply,
      conversation_id: data.conversation_id
    };
  }
}
