import { useState, useRef, useEffect, useCallback } from "react";

export function useChatScroll<T>(messages: T[]) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const lastMessagesLength = useRef(messages.length);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    
    // Consider it "near bottom" if within a small threshold (e.g., 100px)
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    
    // Only show button if there's meaningful overflow and we aren't near the bottom
    const hasOverflow = scrollHeight > clientHeight;
    setShowScrollButton(hasOverflow && !isNearBottom);
  }, []);

  const handleScroll = useCallback(() => {
    checkScroll();
  }, [checkScroll]);

  useEffect(() => {
    if (!scrollRef.current) return;
    
    const isNewMessage = messages.length > lastMessagesLength.current;
    lastMessagesLength.current = messages.length;

    if (isNewMessage) {
      // User sent a new message -> smoothly bring it into view
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
      setShowScrollButton(false);
    } else {
      // Streaming updates: DO NOT force scroll to bottom. 
      // Let the content grow naturally downward so the user can read from the top.
      checkScroll();
    }
  }, [messages, checkScroll]);

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollHeight, clientHeight } = scrollRef.current;
    scrollRef.current.scrollTo({
      top: scrollHeight - clientHeight,
      behavior: "smooth",
    });
    setShowScrollButton(false);
  }, []);

  // Check initial state after mount
  useEffect(() => {
    checkScroll();
  }, [checkScroll]);

  return { scrollRef, showScrollButton, handleScroll, scrollToBottom };
}
