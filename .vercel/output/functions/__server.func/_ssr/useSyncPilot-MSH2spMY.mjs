import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useSyncPilot-MSH2spMY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useSyncPilotInternal() {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("career_twin");
	const [conversationId, setConversationId] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [userData, setUserData] = (0, import_react.useState)(null);
	const [userDataLoading, setUserDataLoading] = (0, import_react.useState)(false);
	const [conversations, setConversations] = (0, import_react.useState)([]);
	const loadUserData = (0, import_react.useCallback)(async () => {
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) return;
		setUserDataLoading(true);
		try {
			const [pRes, xRes, sRes, psRes, ghRes, rRes, dsaRes, achRes, memRes] = await Promise.all([
				supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle(),
				supabase.from("xp_levels").select("*").eq("user_id", user.id).maybeSingle(),
				supabase.from("streaks").select("*").eq("user_id", user.id).maybeSingle(),
				supabase.from("placement_scores").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
				supabase.from("github_analysis").select("*").eq("user_id", user.id).maybeSingle(),
				supabase.from("resume_analysis").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
				supabase.from("user_topic_progress").select("*").eq("user_id", user.id),
				supabase.from("achievements").select("code").eq("user_id", user.id),
				supabase.from("ai_memory").select("*").eq("user_id", user.id).maybeSingle()
			]);
			setUserData({
				profile: pRes.data,
				xp: xRes.data,
				streak: sRes.data,
				placementScore: psRes.data,
				github: ghRes.data,
				resume: rRes.data,
				dsaTopics: dsaRes.data ?? [],
				achievements: (achRes.data ?? []).map((a) => a.code),
				memory: memRes.data
			});
		} finally {
			setUserDataLoading(false);
		}
	}, []);
	const loadConversations = (0, import_react.useCallback)(async () => {
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) return [];
		const { data } = await supabase.from("ai_conversations").select("*").eq("user_id", user.id).order("updated_at", { ascending: false }).limit(20);
		setConversations(data ?? []);
		return data ?? [];
	}, []);
	const loadConversation = (0, import_react.useCallback)(async (convId) => {
		setConversationId(convId);
		const { data } = await supabase.from("ai_messages").select("*").eq("conversation_id", convId).order("created_at", { ascending: true });
		setMessages((data ?? []).map((m) => ({
			id: m.id,
			role: m.role,
			content: m.content,
			created_at: m.created_at
		})));
	}, []);
	const startNewConversation = (0, import_react.useCallback)(() => {
		setConversationId(null);
		setMessages([]);
		loadConversations();
	}, [loadConversations]);
	const switchMode = (0, import_react.useCallback)((newMode) => {
		setMode(newMode);
		setConversationId(null);
		setMessages([]);
		loadConversations();
	}, [loadConversations]);
	return {
		loading,
		userDataLoading,
		mode,
		conversationId,
		messages,
		userData,
		conversations,
		sendMessage: (0, import_react.useCallback)(async (message, options) => {
			console.log("STEP 1 sendMessage");
			setLoading(true);
			const userMsg = {
				role: "user",
				content: message,
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			setMessages((prev) => [...prev, userMsg]);
			try {
				const { data, error } = await supabase.functions.invoke("syncpilot-chat", { body: {
					message,
					mode,
					conversation_id: conversationId,
					history: messages.slice(-10).map((m) => ({
						role: m.role,
						content: m.content
					})),
					company: options?.company ?? "",
					role: options?.role ?? ""
				} });
				if (error) throw error;
				const reply = data.reply;
				const newConvId = data.conversation_id ?? null;
				if (newConvId && !conversationId) {
					setConversationId(newConvId);
					const newTitle = message.length > 60 ? message.slice(0, 60) + "…" : message;
					setConversations((prev) => [{
						id: newConvId,
						mode,
						title: newTitle,
						updated_at: (/* @__PURE__ */ new Date()).toISOString()
					}, ...prev]);
					setTimeout(() => {
						console.log("STEP 6 refresh history");
						loadConversations();
					}, 1e3);
				} else if (conversationId) setConversations((prev) => {
					const arr = [...prev];
					const idx = arr.findIndex((c) => c.id === conversationId);
					if (idx !== -1) {
						arr[idx] = {
							...arr[idx],
							updated_at: (/* @__PURE__ */ new Date()).toISOString()
						};
						const [item] = arr.splice(idx, 1);
						arr.unshift(item);
					}
					return arr;
				});
				const assistantMsg = {
					role: "assistant",
					content: reply,
					created_at: (/* @__PURE__ */ new Date()).toISOString()
				};
				setMessages((prev) => [...prev, assistantMsg]);
				return reply;
			} catch (err) {
				const errMsg = "Unable to reach SyncPilot intelligence layer. Please try again.";
				setMessages((prev) => [...prev, {
					role: "assistant",
					content: errMsg
				}]);
				throw err;
			} finally {
				setLoading(false);
			}
		}, [
			mode,
			conversationId,
			messages,
			loadConversations
		]),
		switchMode,
		startNewConversation,
		loadUserData,
		loadConversations,
		loadConversation,
		setMessages
	};
}
var SyncPilotContext = (0, import_react.createContext)(null);
function SyncPilotProvider({ children }) {
	const state = useSyncPilotInternal();
	return (0, import_react.createElement)(SyncPilotContext.Provider, { value: state }, children);
}
function useSyncPilot() {
	const context = (0, import_react.useContext)(SyncPilotContext);
	if (!context) return useSyncPilotInternal();
	return context;
}
//#endregion
export { useSyncPilot as n, SyncPilotProvider as t };
