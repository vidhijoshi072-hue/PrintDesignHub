import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { loadChatThreads, persistChatThreads, sendChatMessage } from "../services/chatService";

const SOCKET_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1").replace("/api/v1", "");

export function useChatBoard({ role, userName }) {
  const [threads, setThreads] = useState(() => loadChatThreads(role));
  const [activeThreadId, setActiveThreadId] = useState(() => loadChatThreads(role)[0]?.id || null);
  const socketRef = useRef(null);

  useEffect(() => {
    const nextThreads = loadChatThreads(role);
    setThreads(nextThreads);
    setActiveThreadId((current) => current || nextThreads[0]?.id || null);
  }, [role]);

  useEffect(() => {
    persistChatThreads(threads);
  }, [threads]);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true
    });

    socketRef.current = socket;

    const handleReceive = (payload) => {
      const targetId = payload.threadId || activeThreadId;

      if (!targetId) {
        return;
      }

      setThreads((current) =>
        current.map((thread) =>
          thread.id === targetId
            ? {
                ...thread,
                messages: [
                  ...thread.messages,
                  {
                    id: payload.id || `socket-${Date.now()}`,
                    senderType: "participant",
                    text: payload.message,
                    timestamp: payload.timestamp || new Date().toISOString()
                  }
                ]
              }
            : thread
        )
      );
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
      socket.disconnect();
    };
  }, [activeThreadId]);

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeThreadId) || threads[0] || null,
    [threads, activeThreadId]
  );

  const sendMessage = async (text) => {
    if (!text.trim() || !activeThread) {
      return;
    }

    const optimisticMessage = {
      id: `local-${Date.now()}`,
      senderType: "me",
      text,
      timestamp: new Date().toISOString()
    };

    setThreads((current) =>
      current.map((thread) =>
        thread.id === activeThread.id
          ? { ...thread, messages: [...thread.messages, optimisticMessage] }
          : thread
      )
    );

    socketRef.current?.emit("sendMessage", {
      threadId: activeThread.id,
      message: text,
      senderName: userName,
      timestamp: optimisticMessage.timestamp
    });

    await sendChatMessage({
      sender: userName,
      receiver: activeThread.participant.id,
      message: text
    });
  };

  return {
    threads,
    activeThread,
    activeThreadId,
    setActiveThreadId,
    sendMessage
  };
}
