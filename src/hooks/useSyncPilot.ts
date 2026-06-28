import { useState, useCallback, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SyncPilotMode = "career_twin" | "recruiter" | "interview";

export type ChatMessage = {
  id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
};

export type UserData = {
  profile: any;
  xp: any;
  streak: any;
  placementScore: any;
  github: any;
  resume: any;
  dsaTopics: any[];
  achievements: string[];
  memory: any;
};

function useSyncPilotInternal() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<SyncPilotMode>("career_twin");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);

  const loadUserData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setUserDataLoading(true);
    try {
      const [pRes, xRes, sRes, psRes, ghRes, rRes, dsaRes, achRes, memRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("xp_levels").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("streaks").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("placement_scores").select("*").eq("user_id", user.id)
          .order("created_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("github_analysis").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("resume_analysis").select("*").eq("user_id", user.id)
          .order("created_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("user_topic_progress").select("*").eq("user_id", user.id),
        supabase.from("achievements").select("code").eq("user_id", user.id),
        supabase.from("ai_memory").select("*").eq("user_id", user.id).maybeSingle(),
      ]);

      setUserData({
        profile: pRes.data,
        xp: xRes.data,
        streak: sRes.data,
        placementScore: psRes.data,
        github: ghRes.data,
        resume: rRes.data,
        dsaTopics: dsaRes.data ?? [],
        achievements: (achRes.data ?? []).map((a: any) => a.code),
        memory: memRes.data,
      });
    } finally {
      setUserDataLoading(false);
    }
  }, []);

  const loadConversations = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data } = await supabase
      .from("ai_conversations")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(20);
    setConversations(data ?? []);
    return data ?? [];
  }, []);

  const loadConversation = useCallback(async (convId: string) => {
    setConversationId(convId);
    const { data } = await supabase
      .from("ai_messages")
      .select("*")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });
    setMessages((data ?? []).map((m: any) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      created_at: m.created_at,
    })));
  }, []);

  const startNewConversation = useCallback(() => {
    setConversationId(null);
    setMessages([]);
    loadConversations();
  }, [loadConversations]);

  const switchMode = useCallback((newMode: SyncPilotMode) => {
    setMode(newMode);
    setConversationId(null);
    setMessages([]);
    loadConversations();
  }, [loadConversations]);

  const sendMessage = useCallback(async (
    message: string,
    options?: { company?: string; role?: string }
  ): Promise<string> => {
    console.log("STEP 1 sendMessage");
    setLoading(true);

    const userMsg: ChatMessage = {
      role: "user",
      content: message,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const { data, error } = await supabase.functions.invoke("syncpilot-chat", {
        body: {
          message,
          mode,
          conversation_id: conversationId,
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
          company: options?.company ?? "",
          role: options?.role ?? "",
        },
      });

      if (error) throw error;

      const reply: string = data.reply;
      const newConvId: string | null = data.conversation_id ?? null;

      if (newConvId && !conversationId) {
        setConversationId(newConvId);
        
        // Optimistic update to prevent read-after-write race condition
        const newTitle = message.length > 60 ? message.slice(0, 60) + "…" : message;
        setConversations(prev => [{
          id: newConvId,
          mode: mode,
          title: newTitle,
          updated_at: new Date().toISOString()
        }, ...prev]);

        // Background reload after delay to ensure consistency
        setTimeout(() => {
          console.log("STEP 6 refresh history");
          loadConversations();
        }, 1000);
      } else if (conversationId) {
        // Optimistically bump existing conversation to top
        setConversations(prev => {
          const arr = [...prev];
          const idx = arr.findIndex(c => c.id === conversationId);
          if (idx !== -1) {
            arr[idx] = { ...arr[idx], updated_at: new Date().toISOString() };
            const [item] = arr.splice(idx, 1);
            arr.unshift(item);
          }
          return arr;
        });
      }

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: reply,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMsg]);

      return reply;
    } catch (err) {
      const errMsg = "Unable to reach SyncPilot intelligence layer. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: errMsg }]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mode, conversationId, messages, loadConversations]);

  return {
    loading,
    userDataLoading,
    mode,
    conversationId,
    messages,
    userData,
    conversations,

    // Actions
    sendMessage,
    switchMode,
    startNewConversation,
    loadUserData,
    loadConversations,
    loadConversation,
    setMessages,
  };
}

const SyncPilotContext = createContext<ReturnType<typeof useSyncPilotInternal> | null>(null);

import { createElement } from "react";

export function SyncPilotProvider({ children }: { children: ReactNode }) {
  const state = useSyncPilotInternal();
  return createElement(SyncPilotContext.Provider, { value: state }, children);
}

export function useSyncPilot() {
  const context = useContext(SyncPilotContext);
  if (!context) {
    return useSyncPilotInternal();
  }
  return context;
}