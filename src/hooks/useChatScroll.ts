import { useState, useRef, useEffect, useCallback } from "react";

export function useChatScroll<T>(messages: T[]) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Start with auto-scroll enabled
  const isAutoScrolling = useRef(true);
  const lastMessagesLength = useRef(messages.length);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    
    if (isNearBottom) {
      isAutoScrolling.current = true;
      setShowScrollButton(false);
    } else {
      isAutoScrolling.current = false;
      setShowScrollButton(true);
    }
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    const isNewMessage = messages.length > lastMessagesLength.current;
    lastMessagesLength.current = messages.length;

    // If it's a completely new message (e.g. user sent), always scroll smoothly.
    // Otherwise (streaming chunk), only auto-scroll if user is already at bottom.
    if (isNewMessage || isAutoScrolling.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        // use smooth only for new messages to avoid flickering during streams
        behavior: isNewMessage ? "smooth" : "auto", 
      });
      setShowScrollButton(false);
      isAutoScrolling.current = true;
    } else {
      // Content expanded, but user is scrolled up. Check if still not near bottom
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
      if (!isNearBottom) {
        setShowScrollButton(true);
      }
    }
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollHeight, clientHeight } = scrollRef.current;
    scrollRef.current.scrollTo({
      top: scrollHeight - clientHeight,
      behavior: "smooth",
    });
    setShowScrollButton(false);
    isAutoScrolling.current = true;
  }, []);

  return { scrollRef, showScrollButton, handleScroll, scrollToBottom };
}
