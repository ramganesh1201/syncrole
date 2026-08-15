import { useCallback, useEffect, useRef, useState } from "react";
import { DSAWorkspaceService } from "@/lib/services/dsa-workspace.service";

const LOCAL_STORAGE_KEY_PREFIX = "syncrole_dsa_draft_";
const SERVER_SAVE_DEBOUNCE_MS = 5000; // 5 seconds
const LOCAL_SAVE_DEBOUNCE_MS = 500;   // 500ms

function getDraftKey(problemId: string, language: string) {
  return `${LOCAL_STORAGE_KEY_PREFIX}${problemId}_${language}`;
}

interface UseDSACodeDraftOptions {
  userId: string | null;
  problemId: string;
  language: string;
  starterCode: string | null;
}

interface DraftState {
  code: string;
  isDirty: boolean;
  isLoading: boolean;
  hasDraft: boolean;         // true if a saved draft differs from starter code
  lastSavedLocally: Date | null;
  lastSavedToServer: Date | null;
}

/**
 * Manages code autosave for the DSA workspace.
 *
 * Strategy:
 * 1. On mount: check localStorage immediately (zero-latency restore)
 * 2. Check server for a draft (may be newer if user used a different device)
 * 3. Use whichever is more recent
 * 4. On code change: save to localStorage after 500ms debounce
 * 5. Save to server after 5s debounce (to avoid excessive DB writes)
 *
 * Draft is NEVER overwritten with the starter code if a draft already exists.
 */
export function useDSACodeDraft({
  userId,
  problemId,
  language,
  starterCode,
}: UseDSACodeDraftOptions): DraftState & {
  setCode: (code: string) => void;
  resetToStarter: () => void;
} {
  const [state, setState] = useState<DraftState>({
    code: starterCode ?? "",
    isDirty: false,
    isLoading: true,
    hasDraft: false,
    lastSavedLocally: null,
    lastSavedToServer: null,
  });

  const localSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const serverSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const codeRef = useRef(starterCode ?? "");

  // --- Initial load ---
  useEffect(() => {
    let cancelled = false;

    async function loadDraft() {
      const key = getDraftKey(problemId, language);
      const localDraft = typeof localStorage !== "undefined"
        ? localStorage.getItem(key)
        : null;

      let serverDraft: { code: string; updated_at: string } | null = null;
      if (userId) {
        serverDraft = await DSAWorkspaceService.getCodeDraft(userId, problemId, language);
      }

      if (cancelled) return;

      // Pick the most recent draft
      let bestCode = starterCode ?? "";
      let hasDraft = false;

      if (localDraft !== null && localDraft !== starterCode) {
        bestCode = localDraft;
        hasDraft = true;
      }

      // If server draft is more recent than local, prefer server
      if (serverDraft?.code && serverDraft.code !== starterCode) {
        const serverTime = serverDraft.updated_at
          ? new Date(serverDraft.updated_at).getTime()
          : 0;

        // We can't easily compare local storage timestamp, so prefer server
        // if local draft looks the same as starter (user hasn't typed anything)
        if (!hasDraft || bestCode === starterCode) {
          bestCode = serverDraft.code;
          hasDraft = true;
        } else if (serverTime > Date.now() - SERVER_SAVE_DEBOUNCE_MS * 2) {
          // Server draft is very recent — trust it
          bestCode = serverDraft.code;
        }
      }

      codeRef.current = bestCode;
      setState({
        code: bestCode,
        isDirty: false,
        isLoading: false,
        hasDraft,
        lastSavedLocally: null,
        lastSavedToServer: serverDraft?.updated_at
          ? new Date(serverDraft.updated_at)
          : null,
      });
    }

    loadDraft();
    return () => { cancelled = true; };
  }, [userId, problemId, language, starterCode]);

  // --- Code change handler ---
  const setCode = useCallback(
    (newCode: string) => {
      codeRef.current = newCode;
      setState((s) => ({ ...s, code: newCode, isDirty: true }));

      // Local save (fast)
      if (localSaveTimerRef.current) clearTimeout(localSaveTimerRef.current);
      localSaveTimerRef.current = setTimeout(() => {
        const key = getDraftKey(problemId, language);
        try {
          localStorage.setItem(key, newCode);
        } catch {
          // localStorage may be full or disabled
        }
        setState((s) => ({ ...s, lastSavedLocally: new Date() }));
      }, LOCAL_SAVE_DEBOUNCE_MS);

      // Server save (slow)
      if (serverSaveTimerRef.current) clearTimeout(serverSaveTimerRef.current);
      if (userId) {
        serverSaveTimerRef.current = setTimeout(async () => {
          await DSAWorkspaceService.saveCodeDraft(userId, problemId, language, newCode);
          setState((s) => ({ ...s, lastSavedToServer: new Date() }));
        }, SERVER_SAVE_DEBOUNCE_MS);
      }
    },
    [userId, problemId, language]
  );

  // --- Reset to starter code ---
  const resetToStarter = useCallback(() => {
    const code = starterCode ?? "";
    codeRef.current = code;
    setState((s) => ({
      ...s,
      code,
      isDirty: false,
      hasDraft: false,
    }));

    // Clear local draft
    const key = getDraftKey(problemId, language);
    try {
      localStorage.removeItem(key);
    } catch {}

    // Clear server draft
    if (userId) {
      DSAWorkspaceService.saveCodeDraft(userId, problemId, language, code).catch(() => {});
    }
  }, [userId, problemId, language, starterCode]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (localSaveTimerRef.current) clearTimeout(localSaveTimerRef.current);
      if (serverSaveTimerRef.current) clearTimeout(serverSaveTimerRef.current);
    };
  }, []);

  return {
    ...state,
    setCode,
    resetToStarter,
  };
}
